/**
 * HIFPB Monteiro — Sistema de Consulta de Horários Acadêmicos
 * Lógica Principal da Aplicação Front-End (Vanilla JS)
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // ESTADO DA APLICAÇÃO
  // ==========================================================================
  const state = {
    queryType: "turma", // 'turma' | 'curso' | 'professor' | 'ambiente'
    selectedEntityId: null,
    viewMode: "table",  // 'table' | 'list'
    filters: {
      search: "",
      day: "all",
      teacher: "all",
      room: "all"
    },
    selectorFilterText: ""
  };

  // ==========================================================================
  // ELEMENTOS DO DOM
  // ==========================================================================
  const DOM = {
    // Topbar & Header
    liveClockText: document.getElementById("liveClockText"),
    lastUpdateText: document.getElementById("lastUpdateText"),
    breadcrumbHome: document.getElementById("breadcrumbHome"),
    breadcrumbCurrent: document.getElementById("breadcrumbCurrent"),

    // Navegação e Tabs
    queryTabs: document.querySelectorAll(".query-tab-btn"),
    entitySelectionTitle: document.getElementById("entitySelectionTitle"),
    entityCounterChip: document.getElementById("entityCounterChip"),
    selectorSearchInput: document.getElementById("selectorSearchInput"),
    selectorSearchClearBtn: document.getElementById("selectorSearchClearBtn"),
    entityCardsGrid: document.getElementById("entityCardsGrid"),

    // Seção de Resultados
    scheduleResultSection: document.getElementById("scheduleResultSection"),
    entityInfoCard: document.getElementById("entityInfoCard"),
    entityInfoAvatar: document.getElementById("entityInfoAvatar"),
    entityKindBadge: document.getElementById("entityKindBadge"),
    entityCodeBadge: document.getElementById("entityCodeBadge"),
    entityMainName: document.getElementById("entityMainName"),
    entitySecondaryDesc: document.getElementById("entitySecondaryDesc"),
    entityMetadataGrid: document.getElementById("entityMetadataGrid"),
    btnBackToSelection: document.getElementById("btnBackToSelection"),
    btnPrintSchedule: document.getElementById("btnPrintSchedule"),

    // Toolbar de Filtros
    filterSearchInput: document.getElementById("filterSearchInput"),
    filterSearchClearBtn: document.getElementById("filterSearchClearBtn"),
    filterDaySelect: document.getElementById("filterDaySelect"),
    filterTeacherSelect: document.getElementById("filterTeacherSelect"),
    filterRoomSelect: document.getElementById("filterRoomSelect"),
    btnClearFilters: document.getElementById("btnClearFilters"),

    // Modos de Exibição
    btnViewTable: document.getElementById("btnViewTable"),
    btnViewList: document.getElementById("btnViewList"),
    mobileDaysNav: document.getElementById("mobileDaysNav"),
    mobileDayButtons: document.querySelectorAll(".mobile-days-nav .day-tab-btn"),

    // Contêineres de Visualização
    scheduleLoadingState: document.getElementById("scheduleLoadingState"),
    scheduleEmptyState: document.getElementById("scheduleEmptyState"),
    emptyStateDesc: document.getElementById("emptyStateDesc"),
    btnEmptyReset: document.getElementById("btnEmptyReset"),
    tableViewContainer: document.getElementById("tableViewContainer"),
    academicTableBody: document.getElementById("academicTableBody"),
    listViewContainer: document.getElementById("listViewContainer"),
    listDaysContainer: document.getElementById("listDaysContainer"),

    // Modal de Detalhes
    classDetailModal: document.getElementById("classDetailModal"),
    modalBadge: document.getElementById("modalBadge"),
    modalShiftBadge: document.getElementById("modalShiftBadge"),
    modalTitle: document.getElementById("modalTitle"),
    modalTeacher: document.getElementById("modalTeacher"),
    modalClass: document.getElementById("modalClass"),
    modalRoom: document.getElementById("modalRoom"),
    modalTime: document.getElementById("modalTime"),
    modalBuilding: document.getElementById("modalBuilding"),
    modalObs: document.getElementById("modalObs"),
    modalCloseBtn: document.getElementById("modalCloseBtn"),
    modalCloseBtnAction: document.getElementById("modalCloseBtnAction"),

    // Toast
    toastNotification: document.getElementById("toastNotification"),
    toastMessage: document.getElementById("toastMessage")
  };

  // ==========================================================================
  // INICIALIZAÇÃO
  // ==========================================================================
  function init() {
    initClock();
    setupEventListeners();
    updateBadgesCounts();
    renderEntitySelector(state.queryType);

    // Inicializa carregando a turma ADS 2025.1 por padrão para experiência imediata
    selectEntity("turma", "ads-2025-1", false);
  }

  // ==========================================================================
  // RELÓGIO EM TEMPO REAL & HIGHLIGHT DE HORÁRIO ATUAL
  // ==========================================================================
  function initClock() {
    function update() {
      const now = new Date();
      const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      const dayName = days[now.getDay()];
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      if (DOM.liveClockText) {
        DOM.liveClockText.textContent = `${dayName}, ${hours}:${minutes}:${seconds}`;
      }
    }
    update();
    setInterval(update, 1000);
  }

  // ==========================================================================
  // ATUALIZAÇÃO DOS CONTADORES DAS ABAS
  // ==========================================================================
  function updateBadgesCounts() {
    const badgeTurma = document.getElementById("badgeCountTurma");
    const badgeCurso = document.getElementById("badgeCountCurso");
    const badgeProf = document.getElementById("badgeCountProf");
    const badgeAmbiente = document.getElementById("badgeCountAmbiente");

    if (badgeTurma) badgeTurma.textContent = DataService.getClasses().length;
    if (badgeCurso) badgeCurso.textContent = DataService.getCourses().length;
    if (badgeProf) badgeProf.textContent = DataService.getTeachers().length;
    if (badgeAmbiente) badgeAmbiente.textContent = DataService.getRooms().length;

    const meta = DataService.getMeta();
    if (DOM.lastUpdateText) DOM.lastUpdateText.textContent = meta.lastUpdate;
  }

  // ==========================================================================
  // RENDERIZAÇÃO DO SELETOR DE ENTIDADES (TURMAS, CURSOS, PROFS, SALAS)
  // ==========================================================================
  function renderEntitySelector(type) {
    state.queryType = type;
    DOM.entityCardsGrid.innerHTML = "";

    // Atualiza classes ativas das abas
    DOM.queryTabs.forEach(tab => {
      const isActive = tab.getAttribute("data-type") === type;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    let items = [];
    let title = "";
    let itemRenderer = null;

    const filterText = state.selectorFilterText.toLowerCase().trim();

    if (type === "turma") {
      title = "Selecione uma Turma:";
      items = DataService.getClasses().filter(c => 
        !filterText || c.name.toLowerCase().includes(filterText) || c.code.toLowerCase().includes(filterText)
      );
      itemRenderer = (item) => {
        const course = DataService.getCourseById(item.courseId);
        const scheduleCount = DataService.getByCategory("turma", item.id).length;
        const isSelected = state.selectedEntityId === item.id;
        return `
          <button type="button" class="entity-card-option ${isSelected ? 'selected' : ''}" data-id="${item.id}" data-type="turma" role="radio" aria-checked="${isSelected}">
            <div class="card-option-header">
              <span class="card-option-title">${item.name}</span>
              <span class="card-option-badge">${item.period}</span>
            </div>
            <div class="card-option-sub">${course ? course.name : ''}</div>
            <div class="card-option-footer">
              <span>Turno: <strong>${capitalize(item.shift)}</strong></span>
              <span class="card-cta-arrow">${scheduleCount} aulas ›</span>
            </div>
          </button>
        `;
      };
    } else if (type === "curso") {
      title = "Selecione um Curso:";
      items = DataService.getCourses().filter(c => 
        !filterText || c.name.toLowerCase().includes(filterText) || c.code.toLowerCase().includes(filterText)
      );
      itemRenderer = (item) => {
        const classes = DataService.getClasses().filter(c => c.courseId === item.id);
        const scheduleCount = DataService.getByCategory("curso", item.id).length;
        const isSelected = state.selectedEntityId === item.id;
        return `
          <button type="button" class="entity-card-option ${isSelected ? 'selected' : ''}" data-id="${item.id}" data-type="curso" role="radio" aria-checked="${isSelected}">
            <div class="card-option-header">
              <span class="card-option-title">${item.name}</span>
              <span class="card-option-badge">${item.code}</span>
            </div>
            <div class="card-option-sub">${item.level} • ${item.duration}</div>
            <div class="card-option-footer">
              <span>${classes.length} turmas ativas</span>
              <span class="card-cta-arrow">${scheduleCount} aulas ›</span>
            </div>
          </button>
        `;
      };
    } else if (type === "professor") {
      title = "Selecione um(a) Docente:";
      items = DataService.getTeachers().filter(t => 
        !filterText || t.name.toLowerCase().includes(filterText) || t.areas.some(a => a.toLowerCase().includes(filterText))
      );
      itemRenderer = (item) => {
        const scheduleCount = DataService.getByCategory("professor", item.id).length;
        const isSelected = state.selectedEntityId === item.id;
        return `
          <button type="button" class="entity-card-option ${isSelected ? 'selected' : ''}" data-id="${item.id}" data-type="professor" role="radio" aria-checked="${isSelected}">
            <div class="card-option-header">
              <span class="card-option-title">${item.name}</span>
              <span class="card-option-badge">Docente</span>
            </div>
            <div class="card-option-sub">${item.title}</div>
            <div class="card-option-footer">
              <span>${item.department.replace("Unidade Acadêmica de ", "U.A. ")}</span>
              <span class="card-cta-arrow">${scheduleCount} horários ›</span>
            </div>
          </button>
        `;
      };
    } else if (type === "ambiente") {
      title = "Selecione um Ambiente (Sala/Lab):";
      items = DataService.getRooms().filter(r => 
        !filterText || r.name.toLowerCase().includes(filterText) || r.code.toLowerCase().includes(filterText)
      );
      itemRenderer = (item) => {
        const scheduleCount = DataService.getByCategory("ambiente", item.id).length;
        const isSelected = state.selectedEntityId === item.id;
        return `
          <button type="button" class="entity-card-option ${isSelected ? 'selected' : ''}" data-id="${item.id}" data-type="ambiente" role="radio" aria-checked="${isSelected}">
            <div class="card-option-header">
              <span class="card-option-title">${item.name}</span>
              <span class="card-option-badge">${item.code}</span>
            </div>
            <div class="card-option-sub">${item.building}</div>
            <div class="card-option-footer">
              <span>Capacidade: <strong>${item.capacity} vagas</strong></span>
              <span class="card-cta-arrow">${scheduleCount} alocações ›</span>
            </div>
          </button>
        `;
      };
    }

    DOM.entitySelectionTitle.textContent = title;
    DOM.entityCounterChip.textContent = `${items.length} opções disponíveis`;

    if (items.length === 0) {
      DOM.entityCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-muted);">
          Nenhum resultado correspondente a "<strong>${escapeHtml(filterText)}</strong>".
        </div>
      `;
      return;
    }

    DOM.entityCardsGrid.innerHTML = items.map(itemRenderer).join("");

    // Adiciona evento de clique a cada card de opção
    DOM.entityCardsGrid.querySelectorAll(".entity-card-option").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        const category = card.getAttribute("data-type");
        selectEntity(category, id, true);
      });
    });
  }

  // ==========================================================================
  // SELEÇÃO DE UMA ENTIDADE E CARREGAMENTO DOS HORÁRIOS
  // ==========================================================================
  function selectEntity(type, id, scrollToView = true) {
    state.queryType = type;
    state.selectedEntityId = id;

    // Reseta filtros internos da grade
    resetScheduleFilters(false);

    // Renderiza o cabeçalho das informações da entidade
    const entityInfo = DataService.getEntityInfo(type, id);
    if (!entityInfo) return;

    // Atualiza os cards visuais na lista de seleção
    DOM.entityCardsGrid.querySelectorAll(".entity-card-option").forEach(card => {
      const isSelected = card.getAttribute("data-id") === id && card.getAttribute("data-type") === type;
      card.classList.toggle("selected", isSelected);
      card.setAttribute("aria-checked", isSelected ? "true" : "false");
    });

    // Atualiza Breadcrumbs
    const typeNames = {
      turma: "Por Turma",
      curso: "Por Curso",
      professor: "Por Professor",
      ambiente: "Por Ambiente"
    };
    DOM.breadcrumbCurrent.textContent = `${typeNames[type]} › ${entityInfo.title}`;

    // Popula o Header da Entidade
    DOM.entityKindBadge.textContent = typeNames[type];
    DOM.entityCodeBadge.textContent = entityInfo.badge;
    DOM.entityMainName.textContent = entityInfo.title;
    DOM.entitySecondaryDesc.textContent = entityInfo.subtitle;

    // Ícone do Avatar
    DOM.entityInfoAvatar.innerHTML = getCategoryIconSvg(type);

    // Metadados
    DOM.entityMetadataGrid.innerHTML = entityInfo.details.map(d => `
      <div class="meta-item">
        <span class="meta-item-label">${d.label}</span>
        <span class="meta-item-val">${d.value}</span>
      </div>
    `).join("");

    // Exibe seção de resultado
    DOM.scheduleResultSection.style.display = "block";

    // Atualiza opções dos dropdowns de filtros dinâmicos de acordo com a consulta atual
    populateDynamicDropdownFilters();

    // Renderiza a grade com simulação de transição suave
    showLoadingAndRender();

    if (scrollToView) {
      setTimeout(() => {
        DOM.scheduleResultSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  // ==========================================================================
  // POPULAÇÃO DOS DROPDOWNS DE FILTROS DINÂMICOS
  // ==========================================================================
  function populateDynamicDropdownFilters() {
    const rawSchedules = DataService.getByCategory(state.queryType, state.selectedEntityId);

    // Professores presentes nesta consulta
    const teacherIds = [...new Set(rawSchedules.map(s => s.teacherId))];
    const teachers = teacherIds.map(id => DataService.getTeacherById(id)).filter(Boolean);
    
    DOM.filterTeacherSelect.innerHTML = `<option value="all">Todos os Docentes (${teachers.length})</option>` +
      teachers.map(t => `<option value="${t.id}">${t.name}</option>`).join("");

    // Ambientes presentes nesta consulta
    const roomIds = [...new Set(rawSchedules.map(s => s.roomId))];
    const rooms = roomIds.map(id => DataService.getRoomById(id)).filter(Boolean);

    DOM.filterRoomSelect.innerHTML = `<option value="all">Todas as Salas (${rooms.length})</option>` +
      rooms.map(r => `<option value="${r.id}">${r.code} - ${r.name}</option>`).join("");
  }

  // ==========================================================================
  // MOTOR DE FILTRAGEM DOS HORÁRIOS
  // ==========================================================================
  function getFilteredSchedules() {
    const all = DataService.getByCategory(state.queryType, state.selectedEntityId);
    const text = state.filters.search.toLowerCase().trim();
    const day = state.filters.day;
    const teacher = state.filters.teacher;
    const room = state.filters.room;

    return all.filter(item => {
      // Filtro por dia
      if (day !== "all" && String(item.day) !== String(day)) {
        return false;
      }

      // Filtro por professor
      if (teacher !== "all" && item.teacherId !== teacher) {
        return false;
      }

      // Filtro por sala
      if (room !== "all" && item.roomId !== room) {
        return false;
      }

      // Filtro de texto em tempo real (disciplina, professor, sala, turma)
      if (text) {
        const teacherObj = DataService.getTeacherById(item.teacherId);
        const roomObj = DataService.getRoomById(item.roomId);
        const classObj = DataService.getClassById(item.classId);

        const matchDiscipline = item.disciplineName.toLowerCase().includes(text);
        const matchTeacher = teacherObj && teacherObj.name.toLowerCase().includes(text);
        const matchRoom = roomObj && (roomObj.name.toLowerCase().includes(text) || roomObj.code.toLowerCase().includes(text));
        const matchClass = classObj && classObj.name.toLowerCase().includes(text);
        const matchObs = item.obs && item.obs.toLowerCase().includes(text);

        if (!matchDiscipline && !matchTeacher && !matchRoom && !matchClass && !matchObs) {
          return false;
        }
      }

      return true;
    });
  }

  // ==========================================================================
  // TRANSIÇÃO DE CARREGAMENTO & RENDERIZAÇÃO
  // ==========================================================================
  function showLoadingAndRender() {
    DOM.scheduleLoadingState.style.display = "block";
    DOM.tableViewContainer.style.display = "none";
    DOM.listViewContainer.style.display = "none";
    DOM.scheduleEmptyState.style.display = "none";

    setTimeout(() => {
      DOM.scheduleLoadingState.style.display = "none";
      renderScheduleView();
    }, 180);
  }

  function renderScheduleView() {
    const filtered = getFilteredSchedules();

    if (filtered.length === 0) {
      DOM.scheduleEmptyState.style.display = "block";
      DOM.tableViewContainer.style.display = "none";
      DOM.listViewContainer.style.display = "none";
      DOM.emptyStateDesc.textContent = "Nenhuma disciplina foi encontrada com os filtros ou pesquisa aplicados.";
      return;
    }

    DOM.scheduleEmptyState.style.display = "none";

    if (state.viewMode === "table") {
      DOM.tableViewContainer.style.display = "block";
      DOM.listViewContainer.style.display = "none";
      renderTableView(filtered);
    } else {
      DOM.tableViewContainer.style.display = "none";
      DOM.listViewContainer.style.display = "block";
      renderListView(filtered);
    }
  }

  // ==========================================================================
  // 1. RENDERIZAÇÃO EM TABELA (GRADE SEMANAL)
  // ==========================================================================
  function renderTableView(schedules) {
    const shifts = DataService.getShifts();
    const weekDays = DataService.getWeekDays(); // 1 a 6
    let tbodyHtml = "";

    // Para detectar o dia e horário atual
    const now = new Date();
    const currentWeekDay = now.getDay(); // 0 = Dom, 1 = Seg ... 6 = Sáb
    const currentHourMin = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    shifts.forEach(shift => {
      // Verifica se há alguma aula cadastrada para esse turno na consulta atual
      const hasClassesInShift = schedules.some(s => s.shift === shift.id);

      // Renderiza separador de turno
      tbodyHtml += `
        <tr class="shift-divider-row">
          <td colspan="7">
            <div class="shift-divider-content">
              <span>TURNO ${shift.name.toUpperCase()}</span>
            </div>
          </td>
        </tr>
      `;

      shift.slots.forEach(slot => {
        let rowHtml = `<tr>`;

        // Coluna do Horário
        rowHtml += `
          <td class="time-cell">
            <span class="time-slot-label">${slot.label}</span>
            <span>${slot.time}</span>
          </td>
        `;

        // Colunas de Segunda a Sábado (1 a 6)
        weekDays.forEach(day => {
          // Identifica se este dia e slot coincidem com a aula
          const classItem = schedules.find(s => s.day === day.id && s.shift === shift.id && s.slotStart === slot.id);

          // Verifica se é o horário corrente em tempo real
          const isCurrentSlot = (currentWeekDay === day.id && currentHourMin >= slot.start && currentHourMin <= slot.end);
          const cellCurrentClass = isCurrentSlot ? "active-current-slot" : "";

          if (classItem) {
            const teacher = DataService.getTeacherById(classItem.teacherId);
            const room = DataService.getRoomById(classItem.roomId);
            const classObj = DataService.getClassById(classItem.classId);

            rowHtml += `
              <td class="${cellCurrentClass}">
                ${isCurrentSlot ? '<span class="current-slot-pin" title="Horário Atual em Andamento"></span>' : ''}
                <div class="class-schedule-block theme-${classItem.theme}" tabindex="0" role="button" data-schedule-id="${classItem.id}" title="Clique para ver os detalhes completos">
                  <div class="block-subject-name">${classItem.disciplineName}</div>
                  
                  <div class="block-meta-row" title="Docente: ${teacher ? teacher.name : ''}">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"></path>
                    </svg>
                    <span>${teacher ? teacher.name : '—'}</span>
                  </div>

                  <div class="block-bottom-pills">
                    <span class="badge-room" title="Ambiente: ${room ? room.name : ''}">
                      ${room ? room.code : '—'}
                    </span>
                    <span class="badge-class" title="Turma: ${classObj ? classObj.name : ''}">
                      ${classObj ? classObj.code : ''}
                    </span>
                  </div>
                </div>
              </td>
            `;
          } else {
            rowHtml += `
              <td class="${cellCurrentClass}">
                ${isCurrentSlot ? '<span class="current-slot-pin" title="Horário Atual em Andamento"></span>' : ''}
                <div class="empty-cell-placeholder">—</div>
              </td>
            `;
          }
        });

        rowHtml += `</tr>`;
        tbodyHtml += rowHtml;
      });
    });

    DOM.academicTableBody.innerHTML = tbodyHtml;

    // Eventos de clique nas células de disciplinas
    DOM.academicTableBody.querySelectorAll(".class-schedule-block").forEach(block => {
      block.addEventListener("click", () => {
        const id = block.getAttribute("data-schedule-id");
        openClassDetailModal(id);
      });
      block.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const id = block.getAttribute("data-schedule-id");
          openClassDetailModal(id);
        }
      });
    });
  }

  // ==========================================================================
  // 2. RENDERIZAÇÃO EM LISTAGEM (LIST MODE)
  // ==========================================================================
  function renderListView(schedules) {
    const weekDays = DataService.getWeekDays();
    let listHtml = "";

    weekDays.forEach(day => {
      // Se tiver filtro de dia específico e não for este dia, ignora
      if (state.filters.day !== "all" && String(day.id) !== String(state.filters.day)) {
        return;
      }

      const daySchedules = schedules
        .filter(s => s.day === day.id)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      listHtml += `
        <article class="list-day-card">
          <header class="list-day-header">
            <h3 class="list-day-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${day.name}
            </h3>
            <span class="list-day-counter">${daySchedules.length} ${daySchedules.length === 1 ? 'aula' : 'aulas'}</span>
          </header>

          <div class="list-items-container">
            ${daySchedules.length > 0 ? daySchedules.map(item => {
              const teacher = DataService.getTeacherById(item.teacherId);
              const room = DataService.getRoomById(item.roomId);
              const classObj = DataService.getClassById(item.classId);

              return `
                <div class="list-schedule-item theme-${item.theme}" tabindex="0" data-schedule-id="${item.id}" role="button">
                  <div class="list-item-time">
                    <span class="list-time-badge">${item.startTime} - ${item.endTime}</span>
                    <span class="list-slot-badge">${capitalize(item.shift)}</span>
                  </div>

                  <div class="list-item-info">
                    <h4 class="list-subject-title">${item.disciplineName}</h4>
                    <div class="list-subject-meta">
                      <span class="list-meta-chip">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="7" r="4"></circle>
                          <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"></path>
                        </svg>
                        <strong>Docente:</strong> ${teacher ? teacher.name : '—'}
                      </span>
                      <span class="list-meta-chip">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                        <strong>Turma:</strong> ${classObj ? classObj.code : '—'}
                      </span>
                    </div>
                  </div>

                  <div class="list-item-room-badge" title="Ambiente de aula">
                    ${room ? room.name : '—'}
                  </div>
                </div>
              `;
            }).join("") : `
              <div class="list-empty-day">Nenhuma aula agendada para ${day.name}.</div>
            `}
          </div>
        </article>
      `;
    });

    DOM.listDaysContainer.innerHTML = listHtml;

    // Adiciona evento de clique aos itens de listagem
    DOM.listDaysContainer.querySelectorAll(".list-schedule-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-schedule-id");
        openClassDetailModal(id);
      });
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const id = item.getAttribute("data-schedule-id");
          openClassDetailModal(id);
        }
      });
    });
  }

  // ==========================================================================
  // MODAL DE DETALHES DA DISCIPLINA
  // ==========================================================================
  function openClassDetailModal(scheduleId) {
    const all = DataService.getAllSchedules();
    const item = all.find(s => s.id === scheduleId);
    if (!item) return;

    const teacher = DataService.getTeacherById(item.teacherId);
    const room = DataService.getRoomById(item.roomId);
    const classObj = DataService.getClassById(item.classId);
    const weekDays = DataService.getWeekDays();
    const day = weekDays.find(d => d.id === item.day);

    DOM.modalBadge.textContent = "Disciplina Regular";
    DOM.modalShiftBadge.textContent = `Turno ${capitalize(item.shift)}`;
    DOM.modalTitle.textContent = item.disciplineName;
    DOM.modalTeacher.textContent = teacher ? `${teacher.name} (${teacher.title})` : "—";
    DOM.modalClass.textContent = classObj ? `${classObj.name} — ${classObj.period}` : "—";
    DOM.modalRoom.textContent = room ? `${room.name} (${room.code})` : "—";
    DOM.modalTime.textContent = `${day ? day.name : ''} • ${item.startTime} às ${item.endTime}`;
    DOM.modalBuilding.textContent = room ? `${room.building} • Recursos: ${room.equipment}` : "—";
    DOM.modalObs.textContent = item.obs || "Nenhuma observação metodológica adicional registrada.";

    DOM.classDetailModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeClassDetailModal() {
    DOM.classDetailModal.style.display = "none";
    document.body.style.overflow = "";
  }

  // ==========================================================================
  // RESET DE FILTROS & FEEDBACK
  // ==========================================================================
  function resetScheduleFilters(showToast = true) {
    state.filters.search = "";
    state.filters.day = "all";
    state.filters.teacher = "all";
    state.filters.room = "all";

    if (DOM.filterSearchInput) DOM.filterSearchInput.value = "";
    if (DOM.filterSearchClearBtn) DOM.filterSearchClearBtn.style.display = "none";
    if (DOM.filterDaySelect) DOM.filterDaySelect.value = "all";
    if (DOM.filterTeacherSelect) DOM.filterTeacherSelect.value = "all";
    if (DOM.filterRoomSelect) DOM.filterRoomSelect.value = "all";

    // Reseta abas de dias no mobile
    DOM.mobileDayButtons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-day") === "all");
    });

    renderScheduleView();

    if (showToast) {
      triggerToast("Filtros de consulta resetados.");
    }
  }

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  let toastTimer = null;
  function triggerToast(message) {
    if (!DOM.toastNotification || !DOM.toastMessage) return;

    DOM.toastMessage.textContent = message;
    DOM.toastNotification.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toastNotification.classList.remove("show");
    }, 2800);
  }

  // ==========================================================================
  // CONFIGURAÇÃO DE EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    // 1. Alternância entre abas de consulta (Turma, Curso, Professor, Ambiente)
    DOM.queryTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const type = tab.getAttribute("data-type");
        state.selectorFilterText = "";
        if (DOM.selectorSearchInput) DOM.selectorSearchInput.value = "";
        if (DOM.selectorSearchClearBtn) DOM.selectorSearchClearBtn.style.display = "none";
        renderEntitySelector(type);
      });
    });

    // 2. Filtro rápido dentro da lista de seleção
    if (DOM.selectorSearchInput) {
      DOM.selectorSearchInput.addEventListener("input", (e) => {
        state.selectorFilterText = e.target.value;
        if (DOM.selectorSearchClearBtn) {
          DOM.selectorSearchClearBtn.style.display = state.selectorFilterText ? "block" : "none";
        }
        renderEntitySelector(state.queryType);
      });
    }

    if (DOM.selectorSearchClearBtn) {
      DOM.selectorSearchClearBtn.addEventListener("click", () => {
        DOM.selectorSearchInput.value = "";
        state.selectorFilterText = "";
        DOM.selectorSearchClearBtn.style.display = "none";
        renderEntitySelector(state.queryType);
      });
    }

    // 3. Botão para voltar à seleção / trocar consulta
    if (DOM.btnBackToSelection) {
      DOM.btnBackToSelection.addEventListener("click", () => {
        const selectorPanel = document.getElementById("panel-selector");
        if (selectorPanel) {
          selectorPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    if (DOM.breadcrumbHome) {
      DOM.breadcrumbHome.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // 4. Impressão / Salvar PDF
    if (DOM.btnPrintSchedule) {
      DOM.btnPrintSchedule.addEventListener("click", () => {
        triggerToast("Preparando documento para impressão / PDF...");
        setTimeout(() => {
          window.print();
        }, 300);
      });
    }

    // 5. Pesquisa em tempo real na grade de horários
    if (DOM.filterSearchInput) {
      DOM.filterSearchInput.addEventListener("input", (e) => {
        state.filters.search = e.target.value;
        if (DOM.filterSearchClearBtn) {
          DOM.filterSearchClearBtn.style.display = state.filters.search ? "block" : "none";
        }
        renderScheduleView();
      });
    }

    if (DOM.filterSearchClearBtn) {
      DOM.filterSearchClearBtn.addEventListener("click", () => {
        DOM.filterSearchInput.value = "";
        state.filters.search = "";
        DOM.filterSearchClearBtn.style.display = "none";
        renderScheduleView();
      });
    }

    // 6. Filtros dropdown (Dia, Professor, Sala)
    if (DOM.filterDaySelect) {
      DOM.filterDaySelect.addEventListener("change", (e) => {
        state.filters.day = e.target.value;
        // Sincroniza com as abas de dia mobile
        DOM.mobileDayButtons.forEach(btn => {
          btn.classList.toggle("active", btn.getAttribute("data-day") === state.filters.day);
        });
        renderScheduleView();
      });
    }

    if (DOM.filterTeacherSelect) {
      DOM.filterTeacherSelect.addEventListener("change", (e) => {
        state.filters.teacher = e.target.value;
        renderScheduleView();
      });
    }

    if (DOM.filterRoomSelect) {
      DOM.filterRoomSelect.addEventListener("change", (e) => {
        state.filters.room = e.target.value;
        renderScheduleView();
      });
    }

    // 7. Botão Limpar Filtros
    if (DOM.btnClearFilters) {
      DOM.btnClearFilters.addEventListener("click", () => {
        resetScheduleFilters(true);
      });
    }

    if (DOM.btnEmptyReset) {
      DOM.btnEmptyReset.addEventListener("click", () => {
        resetScheduleFilters(true);
      });
    }

    // 8. Alternar entre Modo Tabela e Modo Lista
    if (DOM.btnViewTable) {
      DOM.btnViewTable.addEventListener("click", () => {
        if (state.viewMode === "table") return;
        state.viewMode = "table";
        DOM.btnViewTable.classList.add("active");
        DOM.btnViewTable.setAttribute("aria-checked", "true");
        DOM.btnViewList.classList.remove("active");
        DOM.btnViewList.setAttribute("aria-checked", "false");
        showLoadingAndRender();
      });
    }

    if (DOM.btnViewList) {
      DOM.btnViewList.addEventListener("click", () => {
        if (state.viewMode === "list") return;
        state.viewMode = "list";
        DOM.btnViewList.classList.add("active");
        DOM.btnViewList.setAttribute("aria-checked", "true");
        DOM.btnViewTable.classList.remove("active");
        DOM.btnViewTable.setAttribute("aria-checked", "false");
        showLoadingAndRender();
      });
    }

    // 9. Abas de Seleção de Dia no Celular
    DOM.mobileDayButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const day = btn.getAttribute("data-day");
        state.filters.day = day;
        DOM.filterDaySelect.value = day;
        DOM.mobileDayButtons.forEach(b => b.classList.toggle("active", b === btn));
        renderScheduleView();
      });
    });

    // 10. Fechamento do Modal
    if (DOM.modalCloseBtn) {
      DOM.modalCloseBtn.addEventListener("click", closeClassDetailModal);
    }
    if (DOM.modalCloseBtnAction) {
      DOM.modalCloseBtnAction.addEventListener("click", closeClassDetailModal);
    }
    if (DOM.classDetailModal) {
      DOM.classDetailModal.addEventListener("click", (e) => {
        if (e.target === DOM.classDetailModal) {
          closeClassDetailModal();
        }
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && DOM.classDetailModal.style.display === "flex") {
        closeClassDetailModal();
      }
    });

    // 11. Links do Rodapé (Atalhos diretos para cursos)
    document.querySelectorAll(".footer-link-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const courseId = btn.getAttribute("data-id");
        renderEntitySelector("curso");
        selectEntity("curso", courseId, true);
      });
    });
  }

  // ==========================================================================
  // FUNÇÕES AUXILIARES / UTILITÁRIOS
  // ==========================================================================
  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/[&<>"']/g, (m) => {
      switch (m) {
        case "&": return "&amp;";
        case "<": return "&lt;";
        case ">": return "&gt;";
        case '"': return "&quot;";
        case "'": return "&#039;";
        default: return m;
      }
    });
  }

  function getCategoryIconSvg(category) {
    switch (category) {
      case "turma":
        return `
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        `;
      case "curso":
        return `
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        `;
      case "professor":
        return `
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"></path>
            <line x1="12" y1="11" x2="12" y2="15"></line>
          </svg>
        `;
      case "ambiente":
        return `
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
        `;
      default:
        return "";
    }
  }

  // Executa inicialização da aplicação
  init();
});
