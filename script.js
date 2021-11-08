$(document).ready(function(){

	loadCarro();

	function loadCarro(){
		$.ajax({
	        url: "https://61563f7ce039a0001725a968.mockapi.io/Api/v1/cadastroCarro/",
	        type: 'GET',
	        dataType: 'json',
	        success: function (cars) {            
	        	createElements(cars);
	        },
	        error: function (request, message, error) {
	            console.log(request, message, error);
	        }
	    });
	}

	function createElements(cars){
        var car = "";	            
        for(var i = 0; i <cars.length; i++){
        	car += `<tr id="${cars[i].id}">`;

        	car += `
        		      <td><button class="btn btn-outline-danger" class="car-delete"  nid="${cars[i].id}">Deletar</button></td>
				      <td><button class="btn btn-outline-dark" class="car-edit" nid="${cars[i].id}">Editar</button></td>
				      <td>${cars[i].id}</td>
				      <td>${cars[i].modelo}</td>
				      <td>${cars[i].ano}</td>
				      <td>${cars[i].descricao}</td>
        	`;
			car += "</tr>";
        }				
		
		$(".carsData").append(car);

		$(".car-delete").click(function() {
			var id = $(this).attr("nid");			

			$.ajax({
		        url: "https://61563f7ce039a0001725a968.mockapi.io/Api/v1/cadastroCarro/"+id,
		        type: 'DELETE',
		        dataType: 'json',
		        success: function (cars) {
					$(`#${id}`).remove();
					menssage('delete')            
		        },
		        error: function (request, message, error) {
		            handleException(request, message, error);
		        }
		    });
		});

		$(".car-edit").click(function() {
			var id = $(this).attr("nid");
			$(location).attr('href','cadastroCarro.html?id='+id);			
		});
	}

	function edit(param){

		$("#bt-editar").show()
		$("#bt-salvar").hide()
		getCarsDataId(param);						
	}
	
	var url = new URL(window.location.href);
	var param = url.searchParams.get("id");	

	if(param){		
		edit(param)
	}else{
		$("#bt-salvar").show()
		$("#bt-editar").hide()
	}

	function getCarsDataId(id){
		$.ajax({
	        url: "https://61563f7ce039a0001725a968.mockapi.io/Api/v1/cadastroCarro/"+id,
	        type: 'GET',
	        dataType: 'json',
	        success: function (cars) {            	        	
	        	var modelo    = $("#modelo").val(cars.modelo);
				var ano       = $("#ano").val(cars.ano);
				var descricao = $("#descricao").val(cars.descricao);					        	
				var descricao = $("#id").val(cars.id);					        	
	        },
	        error: function (request, message, error) {
	            console.log(request, message, error);	            
	        }
	    });
	}

	$("#bt-salvar").click(function(){ 

		var modelo    = $("#modelo").val();
		var ano       = $("#ano").val();
		var descricao = $("#descricao").val();
		var id 		  = $("#id").val();		

		$.ajax({
			url: 'https://61563f7ce039a0001725a968.mockapi.io/Api/v1/cadastroCarro/',
			type: 'POST',
			dataType: 'json',
			data: {'id': null, 'modelo': modelo, 'ano': ano, 'descricao': descricao},
			success: function (sucess) {
				menssage('save')
			  	return sucess
			},
			error: function (request, message, error) {
			  console.log(request, message, error);
			}
		});
	});

	$("#bt-editar").click(function(){ 

		var modelo    = $("#modelo").val();
		var ano       = $("#ano").val();
		var descricao = $("#descricao").val();
		var id 		  = $("#id").val();		

		$.ajax({
			url: 'https://61563f7ce039a0001725a968.mockapi.io/Api/v1/cadastroCarro/'+id,
			type: 'PUT',
			dataType: 'json',
			data: {'id': id, 'modelo': modelo, 'ano': ano, 'descricao': descricao},
			success: function (sucess) {
				menssage('edit')
			  	return sucess
			},
			error: function (request, message, error) {
			  console.log(request, message, error);
			}
		});
	});
	
	function menssage(type){

		if(type == 'save'){
			$("#sucesso").html("Cadastrado com sucesso");
			$("#sucesso").show();
			setTimeout(function(){ 
				$("#sucesso").hide();
			}, 4000);

		}else if(type== 'edit'){

			$("#sucesso").html("Editado com sucesso");
			$("#sucesso").show();
			setTimeout(function(){ 
				$("#sucesso").hide();
			}, 4000);

		}else if(type== 'delete'){

			$("#sucesso").html("Deletado com sucesso");
			$("#sucesso").show();
			setTimeout(function(){ 
				$("#sucesso").hide();
			}, 4000);

		}else{
		}
	}
});