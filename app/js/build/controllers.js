function pacienteAddController(e,t,o,n,a,i){var l=this;l.sData=o,t.pageTitle="Registrar Paciente",t.pageIcon="fa-user-plus";var r=function(e){e&&(e.$setPristine(),e.$setUntouched()),l.patient={type:"patient",email:"",password:"",password_confirmation:"",document:"",name:"",last_name:"",gender:"",birthdate:"",phone:"",aditional_information:{blood_type:"",civil_status:"",occupation:"",live_with:"",religion:"",companion:"",place_of_birth:"",state:"",municipality:"",city:"",address:"",cellphone:"",ethnicity:"",education_level:"",municipality:"",state:""}}};r(),null!==l.sData.patient&&(console.log(l.sData.patient.id),n.getUser(l.sData.patient.id).then(function(e){console.log(e.data),l.patient=e.data},function(e){l.patient=l.sData.patient}),l.title="Editar Paciente",l.icon="fa-user");var s=function(){a.show(a.simple().textContent("Paciente registrado!").position("top right").hideDelay(3e3))},c=function(e){i.show(i.alert().parent(angular.element(document.querySelector("#popupContainer"))).clickOutsideToClose(!0).title("Error de registro").textContent("No ha sido posible registrar el paciente, intente nuevamente.").ariaLabel("Error registro de paciente").ok("Volver").targetEvent(e))};l.save=function(e){var t={type:l.patient.type,email:l.patient.email,password:l.patient.document,password_confirmation:l.patient.document,document:l.patient.document,name:l.patient.name,last_name:l.patient.last_name,gender:l.patient.gender,birthdate:l.patient.birthdate,phone:l.patient.phone,blood_type:l.patient.additional_information_user.blood_type,civil_status:l.patient.additional_information_user.civil_status,occupation:l.patient.additional_information_user.occupation,live_with:l.patient.additional_information_user.live_with,religion:l.patient.additional_information_user.religion,companion:l.patient.additional_information_user.companion,place_of_birth:l.patient.additional_information_user.place_of_birth,state:l.patient.additional_information_user.state,municipality:l.patient.additional_information_user.municipality,city:l.patient.additional_information_user.city,address:l.patient.additional_information_user.address,cellphone:l.patient.additional_information_user.cellphone,ethnicity:l.patient.additional_information_user.ethnicity,education_level:l.patient.additional_information_user.education_level,municipality:l.patient.additional_information_user.municipality,state:l.patient.additional_information_user.state};if(l.patient.attendants){({document:l.patient.attendants.document,name:l.patient.attendants.name,last_name:l.patient.attendants.last_name,address:l.patient.attendants.address,relationship:l.patient.attendants.relationship,phone:l.patient.attendants.phone,user:l.patientdocument})}n.addPatient(t).then(function(t){"ok"==t.data.status&&(s(),r(e))},function(e){c($event)})}}function profesionalAddController(e,t,o,n,a,i,l){var r=this;r.sData=o,t.pageTitle="Registrar Profesional",t.pageIcon="fa-user-md",r.dias=["Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"],r.searchTerm,r.clearSearchTerm=function(){r.searchTerm=""};var s=function(){a.show(a.simple().textContent("Profesional registrado!").position("top right").hideDelay(6e3))},c=function(e){i.show(i.alert().parent(angular.element(document.querySelector("#popupContainer"))).clickOutsideToClose(!0).title("Error de registro").textContent("No ha sido posible registrar el Profesional, intente nuevamente.").ariaLabel("Error registro de Profesional").ok("Volver").targetEvent(e))},d=function(e){e&&(e.$setPristine(),e.$setUntouched()),r.profesional={}};d(),null!==r.sData.profesional&&(r.profesional=r.sData.profesional,r.profesional.fechaNacimiento=new Date(Date.parse(r.profesional.fechaNacimiento)),r.profesional.consultorio=parseInt(r.profesional.consultorio),r.title="Editar Profesional",r.icon="fa-user"),r.save=function(e){var t={birthdate:r.profesional.birthdate,gender:r.profesional.gender,last_name:r.profesional.last_name,name:r.profesional.name,phone:r.profesional.phone,email:r.profesional.email,password:r.profesional.document,password_confirmation:r.profesional.document,document:r.profesional.document,type:"doctor",speciality:r.profesional.speciality,medical_license:r.profesional.medical_license,schedule:r.profesional.startsAt+" - "+r.profesional.endsAt,worked_days:r.profesional.worked_days};n.addProfesional(t).then(function(t){console.log(t),s(),d(e),l.path("/profesionales")},function(e){console.log(e),c($event)})}}function adminController(e,t,o,n,a){var i=this;i.sData=o,t.currenPage="admin",t.pageTitle="Añadir Especialidad",t.pageIcon="fa-cog",i.addEspecialidad=function(){i.especialidad&&a.addEspecialidad({name:i.especialidad}).then(function(e){console.log(e)})}}function CitasController(e,t,o,n,a,i,l,r,s,c,d){var p=this;p.sData=c,p.cita={},n.currentPage="citas_medicas",n.pageTitle="Citas Médicas",n.pageIcon="fa-calendar";var u={patient_id:2,doctor_id:1,date_cite:"2016-12-14 10:00",authorized:!0};d.addCite(u).then(function(e){console.log(e)},function(e){console.log(e)}),d.getCites().then(function(e){console.log(e)},function(e){console.log(e)}),p.openToast=function(t){e.show(e.simple().textContent("Hello!"))},p.calendarView="week",p.viewDate=new Date,p.rangeSelected=function(e,t){p.firstDateClicked=e,p.lastDateClicked=t},i.dateFormatter="moment";var g=angular.copy(i.i18nStrings);i.i18nStrings.weekNumber="Semana {week}",r.moment=r.moment||o,s.load("../../../bower_components/moment/locale/es.js").then(function(){o.locale("es",{week:{dow:1}}),o.locale("es")}),l.$on("$destroy",function(){o.locale("en"),i.i18nStrings=g});var f=[{label:"<i class='glyphicon glyphicon-pencil'></i>",onClick:function(e){a.show("Edited",e.calendarEvent)}},{label:"<i class='glyphicon glyphicon-remove'></i>",onClick:function(e){a.show("Deleted",e.calendarEvent)}}];p.events=[{title:"Paciente 1",color:i.colorTypes.warning,startsAt:o().startOf("day").add(7,"hours").toDate(),endsAt:o().startOf("day").add(7.5,"hours").toDate(),draggable:!0,resizable:!0,actions:f},{title:"Paciente 2",color:i.colorTypes.info,startsAt:o().startOf("day").add(7.5,"hours").toDate(),endsAt:o().startOf("day").add(8,"hours").toDate(),draggable:!0,resizable:!0,actions:f},{title:"Paciente 3",color:i.colorTypes.important,startsAt:o().startOf("day").add(8,"hours").toDate(),endsAt:o().startOf("day").add(9,"hours").toDate(),recursOn:"year",draggable:!0,resizable:!0,actions:f}],p.cellIsOpen=!0,p.add=function(){console.log(p.cita),p.events.push({title:p.sData.paciente.primerNombre+" "+p.sData.paciente.primerApellido,startsAt:p.cita.startsAt,endsAt:p.cita.endsAt,color:i.colorTypes.important,draggable:!0}),p.openToast("Cita médica guardada con éxito"),p.cita={}},l.$watch(function(){return p.cita.startsAt},function(){p.cita.endsAt=p.cita.startsAt}),p.eventClicked=function(e){a.show("Clicked",e)},p.eventEdited=function(e){a.show("Edited",e)},p.eventDeleted=function(e){console.log("Deleted"),a.show("Deleted ju",e)},p.eventTimesChanged=function(e){a.show("Dropped or resized",e)},p.toggle=function(e,t,o){e.preventDefault(),e.stopPropagation(),o[t]=!o[t]},p.timespanClicked=function(e,t){"month"===p.calendarView?p.cellIsOpen&&o(e).startOf("day").isSame(o(p.viewDate).startOf("day"))||0===t.events.length||!t.inMonth?p.cellIsOpen=!1:(p.cellIsOpen=!0,p.viewDate=e):"year"===p.calendarView&&(p.cellIsOpen&&o(e).startOf("month").isSame(o(p.viewDate).startOf("month"))||0===t.events.length?p.cellIsOpen=!1:(p.cellIsOpen=!0,p.viewDate=e))}}function DashBoardController(e,t,o){e.currentPage="inicio",e.pageTitle="Inicio",e.pageIcon="fa-home"}function hcController(e,t,o,n,a){var i=this;i.sData=o,t.pageTitle="Historia Clínica",t.pageIcon="fa-address-card";var l={user_id:2,valuation_format:{motivoConsulta:"esta loco",farmacologicos:"todos",efermedadesFamiliares:"todas",EnfermedadesPersonales:"mas",EnfermedadesPsiquiatricas:"ninguna",Medicamentos:"ninguna",DatosSocioDemograficos:"DatosSocio Demograficos",HallasgosImportantes:"Hallasgos Importantes",EvolucionPsicologia:"Evolucion Psicología",ImpresionDiagnostica:"Impresión Diagnostica",ConductaSeguir:"ConductaSeguir",Pruebas:"Pruebas",Diagnostico:"Diagnostico"},evolution_format:{Objetivo:"Objetivos",DesarrolloSesion:"Desarrollo Sesión",EvolucionPaciente:"Evolución Paciente",ConductaSeguir:"Conducta Seguir",DiagnosticoPrincipal:"Diagnostico Principal"},format_not_pos:{procedimientos:"procedimientos...."}};a.addHc(l).then(function(e){console.log(e)},function(e){console.log(e)}),null===i.sData.paciente&&n.path("/pacientes"),i.paciente=i.sData.paciente}function indexController(e,t,o){var n=this;n.close=function(){console.log("close")},e.pageTitle="Inicio",e.pageIcon="fa-home",e.currentPage=t.path().split("/")[1],n.go=function(o){e.currentPage=o,t.path("/"+o),""===o&&(e.currentPage="inicio")}}function loginController(e,t,o,n,a,i){var l=this;l.admin={email:"admin@gmail.com",password:"12345678",password_confirmation:"12345678",document:"12345678",type:"admin",name:"Administrador",last_name:"Administrador"},o.validateUser().then(function(){console.log("redirecionando.."),i.getUsers().then(function(e){console.log(e.data)}),i.getProfesionales().then(function(e){console.log(e)}),i.getProfesional(1).then(function(e){console.log(e.data)},function(e){console.log(e)}),t.path("/")}).catch(function(e){console.log("no validate user..")}),l.submitLogin=function(){o.submitLogin(l.loginForm).then(function(o){console.log("logeado"),console.log(o);var a=o;e.user=a,e.sesion=a.type,i.getProfesional(1).then(function(e){console.log(e.data)},function(e){console.log(e)}),i.getUsers().then(function(e){console.log(e.data)}),"admin"==a.type&&(t.path("/"),n.ROL_CURRENT_USER=1),"doctor"==a.type&&(t.path("/citas_medicas"),n.ROL_CURRENT_USER=3),"functionary"==a.type&&(t.path("/citas_medicas"),n.ROL_CURRENT_USER=1),"Patient"==a.type&&(t.path("/citas_medicas"),n.ROL_CURRENT_USER=2),n.ROL_CURRENT_USER=3,t.path("/")}).catch(function(e){console.log("No logeado")})},e.pageTitle="Login",e.pageIcon="",e.currentPage=t.path().split("/")[1]}function pacientesController(e,t,o,n,a,i,l,r){function s(e,t){var o=this;o.sData=t,o.hide=function(){e.hide()},o.cancel=function(){e.cancel()},o.answer=function(t){e.hide(t)}}var c=this;c.sData=l,t.pageTitle="Pacientes",t.pageIcon="fa-users",c.showAdvanced=function(e){c.getCurrentSelection()&&i.show({controller:s,controllerAs:"dialog",bindToController:!0,templateUrl:"/views/modalPaciente.html",parent:angular.element(document.body),targetEvent:e,clickOutsideToClose:!0,fullscreen:c.customFullscreen}).then(function(e){c.status='You said the information was "'+e+'".'},function(){c.status="You cancelled the dialog."})},c.seleccionable=!0,c.gridOptions={enableRowSelection:!1,enableRowHeaderSelection:!1,paginationPageSizes:[25,50,75],paginationPageSize:25,enablePaginationControls:!1,enableFiltering:!1,multiSelect:!1,modifierKeysToMultiSelect:!1,noUnselect:!0,onRegisterApi:function(e){c.gridApi=e,c.gridApi.grid.registerRowsProcessor(c.singleFilter,200)},columnDefs:[{field:"id"},{field:"name"},{field:"last_name"},{field:"document"},{field:"birthdate"},{field:"phone"}]},c.toggleRowSelection=function(){c.sData.patient=null,c.gridApi.selection.clearSelectedRows(),c.gridOptions.enableRowSelection=!c.gridOptions.enableRowSelection,c.gridApi.core.notifyDataChange(n.dataChange.OPTIONS)},c.getCurrentSelection=function(){return c.sData.patient=c.gridApi.selection.getSelectedRows()[0],void 0!==c.sData.patient},c.filter=function(){c.gridApi.grid.refresh()},c.singleFilter=function(e){var t=new RegExp(c.filterValue);return e.forEach(function(e){var o=!1;["document","name","last_name"].forEach(function(n){e.entity[n].match(t)&&(o=!0)}),o||(e.visible=!1)}),e},e.$watch(function(){return c.filterValue},c.filter),e.$watch(function(){return c.seleccionable},c.toggleRowSelection),c.go=function(e){c.getCurrentSelection()&&a.path("/"+e)},c.goAdd=function(e){c.sData.patient=null,a.path("/addPaciente")},r.getUser(2).then(function(e){console.log("usuario id:"),console.log(e)}),r.getUsers().then(function(e){c.gridOptions.data=e.data.users.filter(function(e){return"Patient"===e.type}),console.log(c.gridOptions.data)}),o(function(){c.gridApi.selection.selectRow(c.gridOptions.data[0]),c.gridApi.selection.clearSelectedRows()},0,1),s.$inject=["$mdDialog","sData"]}function profesionalesController(e,t,o,n,a,i,l,r){var s=this;s.sData=l,s.seleccionable=!0,s.filterValue="",t.pageTitle="Pacientes",t.pageIcon="fa-user-md",s.gridOptions={enableRowSelection:!1,enableRowHeaderSelection:!1,paginationPageSizes:[25,50,75],paginationPageSize:25,enablePaginationControls:!1,enableFiltering:!1,multiSelect:!1,modifierKeysToMultiSelect:!1,noUnselect:!0,onRegisterApi:function(e){s.gridApi=e,s.gridApi.grid.registerRowsProcessor(s.singleFilter,200)},columnDefs:[{field:"name"},{field:"last_name"},{field:"document"},{field:"birthdate"},{field:"speciality"},{field:"consultorio"}]},s.toggleRowSelection=function(){s.sData.profesional=null,s.gridApi.selection.clearSelectedRows(),s.gridOptions.enableRowSelection=!s.gridOptions.enableRowSelection,s.gridApi.core.notifyDataChange(n.dataChange.OPTIONS)},s.getCurrentSelection=function(){return s.sData.profesional=s.gridApi.selection.getSelectedRows()[0],void 0!==s.sData.profesional},s.filter=function(){s.filterValue&&s.gridApi.grid.refresh()},s.singleFilter=function(e){var t=new RegExp(s.filterValue);return e.forEach(function(e){var o=!1;["name","last_name","document","speciality"].forEach(function(n){e.entity[n].match(t)&&(o=!0)}),o||(e.visible=!1)}),e},e.$watch(function(){return s.filterValue},s.filter),e.$watch(function(){return s.seleccionable},s.toggleRowSelection),s.go=function(e){s.getCurrentSelection()&&a.path("/"+e)},s.goAdd=function(e){s.sData.profesional=null,a.path("/addProfesional")},s.gridOptions.data=s.sData.profesionales,o(function(){s.gridApi.selection.selectRow(s.gridOptions.data[0]),s.gridApi.selection.clearSelectedRows()},0,1)}var eps=angular.module("Eps");eps.controller("PacienteAdd",pacienteAddController),pacienteAddController.$inject=["$scope","$rootScope","sData","eps","$mdToast","$mdDialog"];var eps=angular.module("Eps");eps.controller("ProfesionalAdd",profesionalAddController),profesionalAddController.$inject=["$scope","$rootScope","sData","eps","$mdToast","$mdDialog","$location"];var eps=angular.module("Eps");eps.controller("Admin",adminController),adminController.$inject=["$scope","$rootScope","sData","$location","eps"];var eps=angular.module("Eps");eps.controller("Citas",CitasController),CitasController.$inject=["$mdToast","$auth","moment","$rootScope","alert","calendarConfig","$scope","$window","$ocLazyLoad","sData","eps"];var eps=angular.module("Eps");eps.controller("DashBoard",DashBoardController),DashBoardController.$inject=["$rootScope","$location","$auth"];var eps=angular.module("Eps");eps.controller("HC",hcController),hcController.$inject=["$scope","$rootScope","sData","$location","eps"];var eps=angular.module("Eps");eps.controller("Index",indexController),indexController.$inject=["$rootScope","$location","$auth"];var eps=angular.module("Eps");eps.controller("Login",loginController),loginController.$inject=["$rootScope","$location","$auth","CONFIG","ROLES","eps"];var eps=angular.module("Eps");eps.controller("Pacientes",pacientesController),pacientesController.$inject=["$scope","$rootScope","$interval","uiGridConstants","$location","$mdDialog","sData","eps"];var eps=angular.module("Eps");eps.controller("Profesionales",profesionalesController),profesionalesController.$inject=["$scope","$rootScope","$interval","uiGridConstants","$location","$mdDialog","sData","eps"];