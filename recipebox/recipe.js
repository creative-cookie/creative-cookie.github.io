$(document).ready(function(){
//sort function
function asc_sort(a, b){
	return ($(b).text().toUpperCase()) < ($(a).text().toUpperCase()) ? 1 : -1;    
}

function disableFilter(){
	let recipeList = $('ul.recipe-list li');
	$('.filters li').removeClass('grayed');
	$('.filters li').removeClass('active');
	$('.filters li').addClass(function(){
		var a = this.textContent.toUpperCase();
		return recipeList.filter(function(){
		return this.textContent.charAt(0).toUpperCase() === a
		}).length ? 'active' : 'grayed';
	});
};
disableFilter();
/*########## FILTER RECIPES ##########*/

	//show only with first letter selected
	$('.filters').on("click", 'li.active', function() {
		let letter = $(this).text().charAt(0).toLowerCase();

		//highlight letter that was selected
		$('.filters li').each(function() {
			$(this).removeClass('selected');
		});
		$('.all').removeClass('selected');
		$(this).addClass('selected');
		disableFilter();

		$('ul.recipe-list li').removeClass('current');
		$('.recipe-content').removeClass('current');

		$('ul.recipe-list li').each(function() {
			if ($(this).text().charAt(0).toLowerCase() == letter) {
				$(this).addClass('show');
				$(this).removeClass('hide');
			} else {
				$(this).addClass('hide');
				$(this).removeClass('show');
			}
		});

		let firstRecipe = $('.show').first().attr('data-recipe');

		$('.show').first().addClass('current');
		$("."+firstRecipe).addClass('current');
	});

	//show all
	$('.all').on("click", function() {
		//show all recipes
		$('ul.recipe-list li').each(function() {
			$(this).addClass('show');
			$(this).removeClass('hide');
		});
		//remove highlight from filter letters
		$('.filters li').each(function() {
			$(this).removeClass('selected');
		});
		//highlight ALL in filter list
		$(this).addClass('selected');
		disableFilter();
	});

/*########## ADD RECIPE ##########*/
let recipeNum = 6;
	//Plus sign button
	$('#add').click(function(){
		$('#addRecipeModal').show();
	});

	//Cancel button - hide and clear modal
	$('#cancel').click(function(){
		$('.addTitleField').val('');
		$('.addIngredientsField').val('');
		$('.addDirectionsField').val('');
		$('#addRecipeModal').hide();
		$('#disabledBtn').show();
		$('#addRecipe').hide();
	});
	//Enable Add Recipe Button
	$('.modal-content').keyup(function() {
        if(($('.addTitleField').val() != '') && ($('.addIngredientsField').val() != '') && ($('.addDirectionsField').val() != '')) {
		   $('#disabledBtn').hide();
		   $('#addRecipe').show();
		}
		else{
		   $('#disabledBtn').show();
		   $('#addRecipe').hide();
		}
     });
	//Add Recipe button
	$('#addRecipe').on('click', function(){
		let title = $('.addTitleField').val();
		let ingredients = $('.addIngredientsField').val().replace(/\n/g,'<br>');
		let directions = $('.addDirectionsField').val().replace(/\n/g,'<br>');

		$('ul.recipe-list li').removeClass('current');
		$('.recipe-content').removeClass('current');

		//add title (list and detail area)
		$('ul.recipe-list').append('<li class="recipe-link current" data-recipe="recipe'+recipeNum+'">'+title+'</li>');
		$('.recipe-title').append('<h3 class="recipe-content recipe'+recipeNum+' current">'+title+'</h3>');

		//add ingredients and directions
		$('.ingredients').append('<p class="recipe-content recipe'+recipeNum+' current">'+ingredients+'</p>');
		$('.directions').append('<p class="recipe-content recipe'+recipeNum+' current">'+directions+'</p>');

		//sort list
		$("ul.recipe-list li").sort(asc_sort).appendTo('ul.recipe-list');

		
		$('ul.recipe-list li').each(function() {
			$(this).addClass('show');
			$(this).removeClass('hide');
		});
		$('.filters li').each(function() {
			$(this).removeClass('selected');
		});
		$('.all').addClass('selected');

		//increment recipe count and remove/clear modal
		recipeNum++;
		$('.addTitleField').val('');
		$('.addIngredientsField').val('');
		$('.addDirectionsField').val('');
		$('#addRecipeModal').hide();
		$('#disabledBtn').show();
		$('#addRecipe').hide();
		$('.details .icons').show();
		disableFilter();
	});

/*########## SELECT RECIPE #########*/
	//Select Recipe and show details
	$('ul.recipe-list').on('click','li',function(){
		let recipe_id = $(this).attr('data-recipe');

		$('ul.recipe-list li').removeClass('current');
		$('.recipe-content').removeClass('current');

		$(this).addClass('current');
		$("."+recipe_id).addClass('current');
	})

	//Delete Recipes and Select Next in List
	$('.trash').click(function(){
		let prevSelection = $(".recipe-list .current").prev();
		let prevSelectionId = prevSelection.attr('data-recipe');
		let nextSelection = $(".recipe-list .current").next();
		let nextSelectionId = nextSelection.attr('data-recipe');

		$('.current').remove();
		disableFilter();
		
		if(prevSelection.is('li')){
			if(prevSelection.hasClass('show')){
				prevSelection.addClass('current');
				$("."+prevSelectionId).addClass('current');
			}
			else{
				prevSelection.addClass('current');
				$("."+prevSelectionId).addClass('current');
			}
		}
		else{
			nextSelection.addClass('current');
			$("."+nextSelectionId).addClass('current');
		}

		if($('.recipe-list li').length > 0){
			$('.details .icons').show();
			console.log($('.show').length);
		}
		else{
			$('.details .icons').hide();
		}
		if($('.show').length == 0){
			$('ul.recipe-list li').each(function() {
				$(this).addClass('show');
				$(this).removeClass('hide');
			});
			$('.filters li').each(function() {
				$(this).removeClass('selected');
			});
			$('.all').addClass('selected');
		}
		//remove highlight from filter letters

		//highlight ALL in filter list
		
		disableFilter();
	});

/*########## RECIPE TITLE #########*/
	//Edit Recipe Title
	$('#edit-title').click(function(){
		let val = $('.recipe-title h3.current').text();

		//change icons
		$('#edit-title').hide();
		$('.recipe-title .icons2').addClass('show-icons');
		
		//disable other fields
		$(".cover").addClass("cover-enabled");
		$(".cover2").addClass("cover-enabled");
		$('.recipe-title .cover2').removeClass('cover-enabled');

		//hide h3 and display text field
		$('.recipe-title h3.current').addClass('hide');
		$('.recipe-title .temp').addClass('temp-display').val(val);
	});

	//Save Recipe Title Changes
	$('#edit-title-save').click(function(){
		let newVal = $('.recipe-title .temp').val();

		//update content and remove textfield
		$('.recipe-title h3.current').text(newVal);
		$('.recipe-title .temp').removeClass('temp-display');
		$('.recipe-title h3.current').removeClass('hide');

		//update title in recipe selection list
		$('.recipe-link.current').text(newVal);

		//change icons and remove covers
		$('#edit-title').show();
		$('.recipe-title .icons2').removeClass('show-icons');
		$(".cover").removeClass("cover-enabled");
		$(".cover2").removeClass("cover-enabled");

		//sort list
		$("ul.recipe-list li").sort(asc_sort).appendTo('ul.recipe-list');

	
		$('ul.recipe-list li').each(function() {
			$(this).addClass('show');
			$(this).removeClass('hide');
		});
		//remove highlight from filter letters
		$('.filters li').each(function() {
			$(this).removeClass('selected');
		});
		//highlight ALL in filter list
		$('.all').addClass('selected');
		disableFilter();
	});

/*########## INGREDIENTS ##########*/
	//Edit Ingredients Title
	$('#edit-ingredients').click(function(){
		let val = $('.ingredients p.current').html().replace(/<br\s*\/?>/g,'\n');

		//change icons
		$('#edit-ingredients').hide();
		$('.ingredients .icons2').addClass('show-icons');
		
		//disable other fields
		$(".cover").addClass("cover-enabled");
		$(".cover2").addClass("cover-enabled");
		$('.ingredients .cover2').removeClass('cover-enabled');

		//hide p and display text field
		$('.ingredients p.current').addClass('hide');
		$('.ingredients .temp').addClass('temp-display').val(val);
	});
	//Save Ingredients Changes
	$('#edit-ingredients-save').click(function(){
		let newVal = $('.ingredients .temp').val().replace(/\n/g,'<br>');

		//update content and remove textfield
		$('.ingredients p.current').html(newVal);
		$('.ingredients .temp').removeClass('temp-display');
		$('.ingredients p.current').removeClass('hide');

		//change icons and remove covers
		$('#edit-ingredients').show();
		$('.ingredients .icons2').removeClass('show-icons');
		$(".cover").removeClass("cover-enabled");
		$(".cover2").removeClass("cover-enabled");
	});

/*########## DIRECTIONS ##########*/
	//Edit Directions Title
	$('#edit-directions').click(function(){
		let val = $('.directions p.current').html().replace(/<br\s*\/?>/g,'\n');

		//change icons
		$('#edit-directions').hide();
		$('.directions .icons2').addClass('show-icons');
		
		//disable other fields
		$(".cover").addClass("cover-enabled");
		$(".cover2").addClass("cover-enabled");
		$('.directions .cover2').removeClass('cover-enabled');

		//hide p and display text field
		$('.directions p.current').addClass('hide');
		$('.directions .temp').addClass('temp-display').val(val);
	});
	//Save Directions Changes
	$('#edit-directions-save').click(function(){
		let newVal = $('.directions .temp').val().replace(/\n/g,'<br>');

		//update content and remove textfield
		$('.directions p.current').html(newVal);
		$('.directions .temp').removeClass('temp-display');
		$('.directions p.current').removeClass('hide');

		//change icons and remove covers
		$('#edit-directions').show();
		$('.directions .icons2').removeClass('show-icons');
		$(".cover").removeClass("cover-enabled");
		$(".cover2").removeClass("cover-enabled");
	});

	//Discard Changes Button
	$('.discard').click(function(){
		$('#edit-title').show();
		$('#edit-ingredients').show();
		$('#edit-directions').show();
		$('.icons2').removeClass('show-icons');
		$(".cover").removeClass("cover-enabled");
		$(".cover2").removeClass("cover-enabled");
		$('.temp').removeClass('temp-display');
		$('.current').removeClass('hide');
	});
})