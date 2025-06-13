    // --- DATOS SIMULADOS ---
    const projectsData = {
        1: { id: 1, title: "Plataforma Digital para Emprendedores", status: "En Ejecución", statusClass: "bg-green-200 text-green-700", leader: "Juan Pérez", call: "Fondo de Innovación Social 2025", dates: "10/04/2025 - 10/10/2025", budgetAssigned: "S/ 45,000.00", budgetExecuted: "S/ 25,000.00", budgetPercentage: 55, objective: "Fomentar el crecimiento de PYMES mediante el uso de la tecnología y la capacitación continua.", summary: "Desarrollo de una plataforma web interactiva que conectará a emprendedores con mentores experimentados, ofrecerá recursos educativos y facilitará el networking para potenciar el ecosistema emprendedor local.", contextualActionText: "Registrar Avance" },
        2: { id: 2, title: "Implementación de Huerto Urbano Sostenible", status: "En Ejecución", statusClass: "bg-green-200 text-green-700", leader: "Carlos Sanchez", call: "Programa de Vínculo Comunitario 2025", dates: "01/06/2025 - 01/12/2025", budgetAssigned: "S/ 15,000.00", budgetExecuted: "S/ 14,500.00", budgetPercentage: 96, objective: "Mejorar la seguridad alimentaria de la comunidad y promover prácticas agrícolas sostenibles.", summary: "Creación de un huerto orgánico comunitario en las instalaciones del Comedor Popular Luz de Esperanza, capacitando a los beneficiarios en técnicas de cultivo.", contextualActionText: "Registrar Avance" },
        3: { id: 3, title: "Feria de Artesanía Local \"Manos de Chorrillos\"", status: "Finalizado", statusClass: "bg-red-200 text-red-700", leader: "Juan Pérez", call: "Iniciativa Propia", dates: "01/10/2024 - 30/11/2024", budgetAssigned: "S/ 7,500.00", budgetExecuted: "S/ 7,500.00", budgetPercentage: 100, objective: "Incrementar los ingresos de los artesanos de la zona y promover la cultura local.", summary: "Organización y ejecución de una feria de dos días para la exposición y venta de productos artesanales, con actividades culturales complementarias.", contextualActionText: "Ver Informe Final" },
        4: { id: 4, title: "Campaña de reciclaje campus sur", status: "Propuesto", statusClass: "bg-yellow-200 text-yellow-700", leader: "Maria López", call: "Convocatoria Interna Sostenibilidad", dates: "Pendiente", budgetAssigned: "S/ 5,000.00 (Solicitado)", budgetExecuted: "S/ 0.00", budgetPercentage: 0, objective: "Reducir la generación de residuos sólidos en el campus sur y fomentar una cultura de reciclaje.", summary: "Implementación de puntos de acopio selectivo, talleres de sensibilización y alianzas con recicladores locales.", contextualActionText: "Evaluar Propuesta" }
    };

    const mockData = {
        users: ["Juan Pérez", "Maria López", "Carlos Sanchez", "Ana Torres", "Luis Ramirez"],
        calls: ["Fondo Concursable 2025-I", "Iniciativas Estudiantiles 2025", "Vinculación con la Comunidad 2025", "No aplica (Iniciativa Propia)"],
        ods: ["1. Fin de la Pobreza", "2. Hambre Cero", "3. Salud y Bienestar", "4. Educación de Calidad", "5. Igualdad de Género", "6. Agua Limpia y Saneamiento", "7. Energía Asequible y no Contaminante", "8. Trabajo Decente y Crecimiento Económico", "9. Industria, Innovación e Infraestructura", "10. Reducción de las Desigualdades", "11. Ciudades y Comunidades Sostenibles", "12. Producción y Consumo Responsables", "13. Acción por el Clima", "14. Vida Submarina", "15. Vida de Ecosistemas Terrestres", "16. Paz, Justicia e Instituciones Sólidas", "17. Alianzas para lograr los Objetivos"],
        rubric: [
            { id: 1, item: "Título: no exceder de 20 palabras. Escribir con letra mayúscula", max: 5 },
            { id: 2, item: "Los proyectos deberán estar orientados a uno de los 17 objetivos de desarrollo sostenible (ODS).", max: 5 },
            { id: 3, item: "Originalidad (ideas originales, se diferencia de otras propuestas de su disciplina)", max: 15 },
            { id: 4, item: "Los proyectos deben estar orientados a la solución de problemas de salud, sociales, ambientales y económicos", max: 20 },
            { id: 5, item: "Identificar al Grupo beneficiario: poblaciones vulnerables", max: 10 },
            { id: 6, item: "Describir el Impacto social, ambiental", max: 15 },
            { id: 7, item: "Describir claramente la Metodología y etapas de la intervención social", max: 20 },
            { id: 8, item: "Coherencia presupuestal del proyecto (en las partidas financiable por la UPSJB)", max: 10 }
        ]
    };

    // --- LÓGICA DE LA APLICACIÓN ---
    document.addEventListener('DOMContentLoaded', () => {
        const pageTitle = document.getElementById('pageTitle');
        const pages = document.querySelectorAll('.page');
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        const newProjectBtn = document.getElementById('newProjectBtn');
        const evaluationModal = document.getElementById('evaluationModal');
        const closeModalButton = document.getElementById('closeModal');
        const openModalButtons = document.querySelectorAll('.open-evaluation-modal');
        
        window.navigateToPage = (pageId, param = null) => {
            pages.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('active');
            });
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                targetPage.classList.add('active');
                updatePageTitle(pageId, param);
                updateActiveSidebarItem(pageId);

                if(pageId === 'projects') {
                    renderProjectsTable();
                } else if (pageId === 'projectDetail') {
                    loadProjectDetail(param);
                }
            }
        };

        function updatePageTitle(pageId, param) {
             let title = "Dashboard";
             switch(pageId) {
                case 'projects': title = 'Todos los Proyectos'; break;
                case 'newProject': title = 'Nueva Propuesta de Proyecto'; break;
                case 'reports': title = 'Informes'; break;
                case 'users': title = 'Usuarios'; break;
                case 'settings': title = 'Configuración'; break;
                case 'projectDetail':
                    const project = projectsData[param];
                    title = project ? `Detalle: ${project.title.substring(0, 25)}...` : 'Detalle del Proyecto';
                    break;
             }
             pageTitle.textContent = title;
        }

        function updateActiveSidebarItem(pageId) {
            sidebarItems.forEach(item => {
                item.classList.remove('active');
                let effectivePageId = (pageId === 'newProject' || pageId === 'projectDetail') ? 'projects' : pageId;
                if (item.dataset.page === effectivePageId) {
                    item.classList.add('active');
                }
            });
        }
        
        function renderProjectsTable() {
            const tableBody = document.getElementById('projectsTableBody');
            if(!tableBody) return;
            tableBody.innerHTML = '';
            for(const id in projectsData) {
                const project = projectsData[id];
                const row = document.createElement('tr');
                row.className = 'border-b hover:bg-gray-50';
                row.innerHTML = `
                    <td class="py-3 px-4">${project.title}</td>
                    <td class="py-3 px-4"><span class="px-2 py-1 rounded-full text-xs ${project.statusClass}">${project.status}</span></td>
                    <td class="py-3 px-4">${project.leader}</td>
                    <td class="py-3 px-4">${project.budgetAssigned}</td>
                    <td class="py-3 px-4">
                        <button class="text-custom-red-link hover:underline" onclick="navigateToPage('projectDetail', ${project.id})">Ver Detalles</button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        }

        function loadProjectDetail(projectId) {
            const project = projectsData[projectId];
            if (!project) return;

            document.getElementById('projectDetailTitle').textContent = project.title;
            const statusElement = document.getElementById('projectDetailStatus').querySelector('span');
            statusElement.textContent = project.status;
            statusElement.className = `px-2 py-1 rounded-full text-xs ${project.statusClass}`;
            
            document.getElementById('projectDetailLeader').textContent = project.leader;
            document.getElementById('projectDetailCall').textContent = project.call;
            document.getElementById('projectDetailDates').textContent = project.dates;
            document.getElementById('projectDetailBudgetAssigned').textContent = project.budgetAssigned;
            document.getElementById('projectDetailBudgetExecuted').textContent = project.budgetExecuted;
            document.getElementById('projectDetailObjective').textContent = project.objective;
            document.getElementById('projectDetailSummary').textContent = project.summary;
            
            const budgetProgress = document.getElementById('projectDetailBudgetProgress');
            budgetProgress.style.width = `${project.budgetPercentage}%`;
            document.getElementById('projectDetailBudgetPercentage').textContent = `${project.budgetPercentage}% ejecutado`;

            const contextualActionButton = document.getElementById('projectContextualAction');
            contextualActionButton.textContent = project.contextualActionText;
            contextualActionButton.className = 'text-white px-6 py-2 rounded-md mt-4 md:mt-0'; // Reset classes
            if (project.status === "Propuesto") {
                contextualActionButton.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
                contextualActionButton.onclick = () => evaluationModal.style.display = 'block';
            } else {
                contextualActionButton.classList.add('bg-custom-red-action', 'hover-bg-custom-red-darker');
                contextualActionButton.onclick = null; 
            }
        }
        
        function populateSelect(selectId, dataArray) {
            const select = document.getElementById(selectId);
            if(select) {
                select.innerHTML = '';
                dataArray.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item;
                    option.textContent = item;
                    select.appendChild(option);
                });
            }
        }

        function renderRubric() {
            const rubricBody = document.getElementById('rubricBody');
            if(!rubricBody) return;
            rubricBody.innerHTML = '';
            mockData.rubric.forEach(item => {
                const row = document.createElement('tr');
                row.className = 'bg-white border-b';
                row.innerHTML = `
                    <td class="px-4 py-2 font-medium text-gray-900">${item.id}</td>
                    <td class="px-4 py-2">${item.item}</td>
                    <td class="px-4 py-2 text-center">
                        <input type="number" class="rubric-score-input w-20 text-center border-gray-300 rounded-md shadow-sm" min="0" max="${item.max}" value="0">
                    </td>
                    <td class="px-4 py-2 text-center">0 – ${item.max}</td>
                `;
                rubricBody.appendChild(row);
            });
            addRubricEventListeners();
        }
        
        function addRubricEventListeners() {
            const scoreInputs = document.querySelectorAll('.rubric-score-input');
            scoreInputs.forEach(input => {
                input.addEventListener('input', updateTotalScore);
            });
        }

        function updateTotalScore() {
            let total = 0;
            const scoreInputs = document.querySelectorAll('.rubric-score-input');
            scoreInputs.forEach(input => {
                const value = parseInt(input.value, 10);
                const max = parseInt(input.max, 10);
                if (!isNaN(value)) {
                    // Clamp the value between 0 and max
                    const clampedValue = Math.max(0, Math.min(value, max));
                    if (value !== clampedValue) {
                       input.value = clampedValue;
                    }
                    total += clampedValue;
                }
            });
            document.getElementById('totalScoreCell').textContent = total;
        }


        // --- Event Listeners ---
        sidebarItems.forEach(item => item.addEventListener('click', (e) => { e.preventDefault(); navigateToPage(item.dataset.page); }));
        if (newProjectBtn) newProjectBtn.addEventListener('click', () => navigateToPage('newProject'));
        document.getElementById('toggleSidebar').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('collapsed'));
        
        openModalButtons.forEach(btn => btn.addEventListener('click', () => {
            evaluationModal.style.display = 'block';
            updateTotalScore(); // Reset/recalculate score on open
        }));
        
        if(closeModalButton) closeModalButton.addEventListener('click', () => evaluationModal.style.display = 'none');
        window.addEventListener('click', (event) => { if (event.target == evaluationModal) evaluationModal.style.display = 'none'; });
        
        // --- Inicialización ---
        function init() {
            document.getElementById('currentDate').textContent = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            populateSelect('projectLeader', mockData.users);
            populateSelect('projectCall', mockData.calls);
            populateSelect('projectODS', mockData.ods);
            renderRubric();
            navigateToPage('dashboard');
        }

        init();
    });