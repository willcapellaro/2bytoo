var validItemsNames = true;
var validAxisNames = true;
//var namesMaster = [];
var items = [];
var yAxisName = document.getElementById('yAxis_name').value;
var xAxisName = document.getElementById('xAxis_name').value;
function menuItemClicked(item)
{
	if (validItemsNames && validAxisNames)
	{
		switch (item)
		{//It goes through this 'switch' when I click on a button on the top bar.
			case "create":
				document.getElementById("rateYDiv").style.display = "none";
				document.getElementById("rateXDiv").style.display = "none";
				document.getElementById("seeDiv").style.display = "none";
				document.getElementById("createDiv").style.display = "block";
				break;
			case "rateY":
				//getNames();
				//saveNames();
				//saveAxisNames();
				//getPreviousIdsOrder();
				//getValues();
				//fillLists('x');
				document.getElementById("createDiv").style.display = "none";
				document.getElementById("seeDiv").style.display = "none";
				document.getElementById("rateXDiv").style.display = "none";
				if (!(document.getElementById("rateYDiv").style.display == 'block'))
				{
					document.getElementById("rateYDiv").style.display = "block";
					//getPreviousIdsOrder();
					//getValues();
					fillLists('y');
					if (document.getElementById('slcActionsY').selectedIndex != 0)
					{
						document.getElementById('slcActionsY').selectedIndex = 0;
					}
					document.getElementById('btnSubmitActionsY').disabled = true;
					document.getElementById('btnSubmitActionsY').className = 'buttonGrey';
					document.getElementById('slcSortY').selectedIndex = 0;
					document.getElementById('btnSubmitSortY').disabled = true;
					document.getElementById('btnSubmitSortY').className = 'buttonGrey';
				}
				break;
			case "rateX":
				//getNames();
				//saveNames();
				//saveAxisNames();
				//getPreviousIdsOrder();
				//getValues();
				//fillLists('y');
				document.getElementById("createDiv").style.display = "none";
				document.getElementById("seeDiv").style.display = "none";
				document.getElementById("rateYDiv").style.display = "none";
				if (!(document.getElementById("rateXDiv").style.display == 'block'))
				{
					document.getElementById("rateXDiv").style.display = "block";
					//getPreviousIdsOrder();
					//getValues();
					fillLists('x');
					if (document.getElementById('slcActionsX').selectedIndex != 0)
					{
						document.getElementById('slcActionsX').selectedIndex = 0;
					}
					document.getElementById('btnSubmitActionsX').disabled = true;
					document.getElementById('btnSubmitActionsX').className = 'buttonGrey';
					document.getElementById('slcSortX').selectedIndex = 0;
					document.getElementById('btnSubmitSortX').disabled = true;
					document.getElementById('btnSubmitSortX').className = 'buttonGrey';
				}
				break;
			case "see":
				//getNames();
				//saveNames();
				//saveAxisNames();
				fillAxisNames();
				document.getElementById("createDiv").style.display = "none";
				document.getElementById("rateYDiv").style.display = "none";
				document.getElementById("rateXDiv").style.display = "none";
				document.getElementById("seeDiv").style.display = "block";
				//getValues();
				//getPreviousIdsOrder();
				drawResult();
				// drawQuadHints();
				break;
			default:
				break;
		}
	}
}
function setValues(axis, value)
{
	document.getElementById('opt' + axis.toUpperCase() + 'd').disabled = true;
	if (typeof(value) == 'string')
	{
		if (value == 'high')
		{
			value = 100;
		}
		else
		{
			if (value == 'medium')
			{
				value = 50;
			}
			else
			{
				if (value == 'low')
				{
					value = 0;
				}
				else
				{
					var groups = [];
					var c = document.getElementById(axis + 'DivRange').getElementsByTagName('input');
					for (var i = 0; i < c.length; i++)
					{
						if (groups.indexOf(Number(c[i].value)) == -1)
						{
							groups.push(Number(c[i].value));
						}
					}
					var min = 0;
					var max = 0;
					for (var i = 0; i < groups.length - 1; i++)
				    {
				        var aux;
				        if (groups[i] < groups[i + 1])
				        {
				            aux = groups[i];
				            groups[i] = groups[i + 1];
				            groups[i + 1] = aux;
				            i = -1;
				        }
				    }
				    groups[0] = {'value' : 100, 'distributed' : true, 'preValue' : groups[0]};
				    groups[groups.length - 1] = {'value' : 0, 'distributed' : true, 'preValue' : groups[groups.length - 1]};
				    for (var i = 1; i < (groups.length - 1); i++)
				    {
				    	groups[i] = {'value' : groups[i], 'distributed' : false, 'preValue' : groups[i]};
				    }
				    var allDistributed = false;
				    while (!allDistributed)
				    {
				    	allDistributed = true;
					    for (var i = 1; i < (groups.length - 1); i++)
					    {
					    	if (!groups[i]['distributed'])
					    	{
					    		allDistributed = false;
					    	}
					    }
					    if (!allDistributed)
					    {
						    for (var i = 1; i < (groups.length - 1); i++)
						    {
						    	if (!groups[i]['distributed'])
						    	{
							    	var j = (i - 1);
							    	while (j > 0)
							    	{
							    		if (groups[j]['distributed'])
										{
											max = j;
											j = -1;
										}
							    		j--;
							    	}
							    	j = (i + 1);
							    	while (j < groups.length)
							    	{
							    		if (groups[j]['distributed'])
										{
											min = j;
											j = groups.length;
										}
							    		j++;
							    	}
						    		i = (groups.length - 1);
						    	}
						    }
					    	var p = (groups[max]['value'] + groups[min]['value']) / 2;
					    	var aprox = 0;
					    	for (var i = 1; i < groups.length; i++)
					    	{
					    		if (!groups[i]['distributed'])
					    		{
					    			var pre = p - groups[aprox]['value'];
					    			if (pre < 0)
					    			{
					    				pre *= -1;
					    			}
					    			var dif = (p - groups[i]['value']);
					    			if (dif < 0)
					    			{
					    				dif *= -1;
					    			}
					    			if (dif < pre)
					    			{
					    				aprox = i;
					    			}
					    		}
					    	}
					    	groups[aprox]['value'] = p;
					    	groups[aprox]['distributed'] = true;
					    }
				    }
				    for (var i = 0; i < groups.length; i++)
				    {
				    	for (var j = 0; j < c.length; j++)
						{
							if (Number(c[j].value) == groups[i]['preValue'])
							{
								c[j].value = groups[i]['value'];
								for (var k = 0; k < items.length; k++)
							    {
							    	if (items[k]['index'] == Number(c[j].split('_')[3]))
							    	{
							    		items[k][axis + 'Value'] = Number(c[j].value);
							    	}
							    }
							}
						}
				    }
				}
			}
		}
	}
	var c;
	if (value != 'distribute')
	{
		/*if (axis == 'y')
		{
			c = document.getElementById('yDivRange').getElementsByTagName('input');
			yValues = [];
			if (c.length)
			{
				for (var i = 0; i < c.length; i++)
			    {
					yValues.push(value);
				}
			}
		}
		if (axis == 'x')
		{
			c = document.getElementById('xDivRange').getElementsByTagName('input');
			xValues = [];
			for (var i = 0; i < c.length; i++)
		    {
				xValues.push(value);
			}
		}*/
		c = document.getElementById(axis + 'DivRange').getElementsByTagName('input');
		for (var i = 0; i < c.length; i++)
	    {
	        c[i].value = value;
	    }
	    for (var i = 0; i < items.length; i++)
	    {
	    	items[i][axis + 'Value'] = value;
	    }
	}
}
function test(values, axis)
{
	for (var i = 0; i < values.length; i++)
	{
		document.getElementById('range_' + axis + '_item_' + i).value = values[i];
	}
}
function submit(axis, option)
{
	switch (option)
	{
		case 'action':
			var v = document.getElementById('slcActions' + axis.toUpperCase()).value;
			if ((v == 'high') || (v == 'medium') || (v == 'low') || (v == 'distribute'))
			{
				setValues(axis, v);
			}
			else
			{//Pendiente ver si se usa en algún momento.
				updateCreateList(axis);
			}
			document.getElementById('slcActions' + axis.toUpperCase()).selectedIndex = 0
			document.getElementById('btnSubmitActions' + axis.toUpperCase()).disabled = true;
			document.getElementById('btnSubmitActions' + axis.toUpperCase()).className = 'buttonGrey';
		break;
		case 'sort':
			var itemsListSortable = yItemsListSortable;
			if (axis == 'x')
			{
				itemsListSortable = xItemsListSortable;
			}
			var v = document.getElementById('slcSort' + axis.toUpperCase()).value;
			if (v == 'master')
			{
				itemsListSortable.removeContainer(document.getElementById(axis + 'ItemsList'));
				document.getElementById('lblChange' + axis.toUpperCase()).innerHTML = '';
				document.getElementById('opt' + axis.toUpperCase() + 'd').disabled = true;
				document.getElementById('opt' + axis.toUpperCase() + 'm').disabled = true;
				//getNames();
				//getPreviousIdsOrder();
				//getValues();
				fillLists(axis);
			}
			else
			{
				itemsListSortable.addContainer(document.getElementById(axis + 'ItemsList'));
				document.getElementById('lblChange' + axis.toUpperCase()).innerHTML = 'Drag items to change their <u>value</u>';
				if ((document.getElementById('slcActions' + axis.toUpperCase()).selectedIndex == 4) || (document.getElementById('slcActions' + axis.toUpperCase()).selectedIndex == 5))
				{
					document.getElementById('slcActions' + axis.toUpperCase()).selectedIndex = 0;
					document.getElementById('btnSubmitActions' + axis.toUpperCase()).disabled = true;
					document.getElementById('btnSubmitActions' + axis.toUpperCase()).className = 'buttonGrey';
				}
				verifyDifferentValues(axis);
				document.getElementById('opt' + axis.toUpperCase() + 'm').disabled = false;
				//getPreviousIdsOrder();
				sortItems(axis);
			}
			document.getElementById('slcSort' + axis.toUpperCase()).selectedIndex = 0
			document.getElementById('btnSubmitSort' + axis.toUpperCase()).disabled = true;
			document.getElementById('btnSubmitSort' + axis.toUpperCase()).className = 'buttonGrey';
		break;
	}
}
function verifyDifferentValues(axis)
{console.log(axis);
	document.getElementById('opt' + axis.toUpperCase() + 'd').disabled = true;
	saveAxisValues(axis);
	getValues();
	var values = yValues;
	if (values.length > 1)
	{
		if (axis == 'x')
		{
			values = xValues;
		}
		for (var i = 1; i < values.length; i++)
		{
			if (values[i] != values[0])
			{
				document.getElementById('opt' + axis.toUpperCase() + 'd').disabled = false;
				i = values.length;
			}
		}
		if (
			document.getElementById('opt' + axis.toUpperCase() + 'd').disabled && 
			(document.getElementById('slcActions' + axis.toUpperCase()).selectedIndex == 4))
		{
			document.getElementById('slcActions' + axis.toUpperCase()).selectedIndex = 0;
			document.getElementById('btnSubmitActions' + axis.toUpperCase()).disabled = true;
			document.getElementById('btnSubmitActions' + axis.toUpperCase()).className = 'buttonGrey';
		}
	}
	localStorage.setItem('items', JSON.stringify(items));
}
function sortItems(axis)
{
	//getValues();
	var auxValues = [];
	for (var i = 0; i < items.length; i++)
	{
		auxValues.push([items[i][axis + 'Value'], i]);
	}
	var axisName = yAxisName;
	/*for (var i = 0; i < yValues.length; i++)
	{
		auxValues.push([yValues[i], i]);
	}*/
	if (axis == 'x')
	{
		axisName = xAxisName;
		/*auxValues = [];
		for (var i = 0; i < xValues.length; i++)
		{
			auxValues.push([xValues[i], i]);
		}*/
	}
	for (var i = 0; i < auxValues.length - 1; i++)
    {
        var aux = [];
        if (auxValues[i][0] < auxValues[i + 1][0])
        {
            aux = [auxValues[i][0], auxValues[i][1]];
            auxValues[i] = [auxValues[i + 1][0], auxValues[i + 1][1]];
            auxValues[i + 1] = [aux[0], aux[1]];
            i = -1;
        }
    }
    document.getElementById(axis + 'ItemsList').innerHTML = '';
    document.getElementById(axis + 'DivRange').innerHTML = '';
    for (var i = 0; i < auxValues.length; i++)
	{
    	$("#" + axis + "ItemsList").append(`
			<div class="` + axis + `Item" id="` + axis + `_item_` + auxValues[i][1] + `">
				<label class="itemName">` + document.getElementById('item_name_' + auxValues[i][1]).value + `</label>
			</div>`
		);
	}
	for (var i = 0; i < auxValues.length; i++)
	{
    	var top = document.getElementById(axis + '_item_' + auxValues[i][1]).offsetTop;
		var right = document.getElementById(axis + '_item_' + auxValues[i][1]).offsetLeft;
		$("#" + axis + "DivRange").append(`
			<div class="rangeDiv" style="top: ` + top + `px; right: ` + right + `px;">
				<label class="lblLowY">Low ` + axisName + `</label>
				<input type="range" id="range_` + axis + `_item_` + auxValues[i][1] + `" value="` + auxValues[i][0] + `" class="` + axis + `Range custom-range" min="0" max="100" ondrag="verifyDifferentValues(\'` + axis + `\')" onchange="verifyDifferentValues(\'` + axis + `\')">
				<label class="lblHighY">High ` + axisName + `</label>
			</div>`);
	}
	var c = document.getElementById('itemsList').children;
	var a = document.getElementById(axis + 'ItemsList').children;
    for (var i = 0; i < c.length; i++)
    {
        if (Number(c[i].id.split('_')[1]) != Number(a[i].id.split('_')[1]))
        {
            document.getElementById('opt' + axis.toUpperCase() + 'm').disabled = true;
            i = c.length;
        }
        else
        {
            document.getElementById('opt' + axis.toUpperCase() + 'm').disabled = false;
        }
    }
}
function addItem()
{
	var nextId = 0;
	var c = document.getElementById('itemsList').children;
	if (c.length)
	{
		for (var i = 0; i < c.length; i++)
		{
			if (c[i].id.length)
			{
				nextId += 1;
			}
		}
	}
	$("#itemsList").append(`
		<div id="item_` + nextId + `" onmouseup="getItems();">
			<input class="itemName" type="text" value="Item ` + (nextId + 1) + `" id="item_name_` + nextId + `" onmouseup="itemsListSortable.removeContainer(document.getElementById('itemsList'));" onmouseleave="itemsListSortable.addContainer(document.getElementById('itemsList'));">
			<button class="deleteItemButton" id="` + nextId + `" onclick="deleteItem(this.id);">Delete</button>
			<label class="lblRepeatedItem" id="lblItem_` + nextId + `"></label>
		</div>`
	);
	document.getElementById(c[0].id.split('_')[1]).disabled = false;
	document.getElementById(c[0].id.split('_')[1]).className = 'itemBackGround';
	verifyItemsNames();
	saveItems();
}
function deleteItem(item)
{
	//var items = document.getElementById('itemsList').children;
	var flag = false;
	//var valuesCopy = [];
	var initialId;
	for (var i = 0; i < items.length; i++)
	{
		if (flag)
		{
			//try
			//{
				//valuesCopy.push([document.getElementById('range_y_item_' + items[i].id.split('_')[1]).value, document.getElementById('range_x_item_' + items[i].id.split('_')[1]).value]);
				valuesCopy.push([items[i]['xValue'], items[i]['yValue']]);
			/*}
			catch
			{
				valuesCopy.push([50, 50]);
			}*/
		}
		//if (items[i].id.split('_')[1] == item)
		if (items[i]['index'] == item)
		{
			flag = true;
			initialId = i;
		}	
	}
	$('#item_' + Number(item)).remove();
	var j = 0;
	var items2 = document.getElementById('itemsList').children;
	for (var i = 0; i < items2.length; i++)
	{
		if (items2[i].id.length)
		{
			var subItems = document.getElementById(items2[i].id).children;
			for (var k = 0; k < subItems.length; k++)
			{
				subItems[k].id = subItems[k].id.replace(subItems[k].id.split('_')[subItems[k].id.split('_').length - 1], j);
			}
			items2[i].id = 'item_' + j;
			j += 1;
		}
	}
	if (items2.length == 1)
	{
		document.getElementById(items[0].id.split('_')[1]).disabled = true;
		document.getElementById(items[0].id.split('_')[1]).className = 'buttonGrey';
	}
	var auxItems = [];
	for (var i = 0; i < items.length; i++)
	{
		if (items[i]['index'] != item)
		{
			auxItems.push(items[i]);
		}
	}
	items = auxItems;
	/*getNames();
	//getPreviousIdsOrder();
	fillLists('y');
	fillLists('x');
	if (valuesCopy.length)
	{
		for (var i = 0; i < valuesCopy.length; i++)
		{
			document.getElementById('range_y_item_' + initialId).value = valuesCopy[i][0];
			document.getElementById('range_x_item_' + initialId).value = valuesCopy[i][1];
			initialId++;
		}
	}
	//getValues();
	fillLists('y');
	fillLists('x');*/
	saveItems();
}
function verifyItemsNames()
{//console.log();
	//getNames();
	var repetidos = [];
	var names = document.getElementById('itemsList').getElementsByClassName('itemName');
	/*var auxNames = [];
	for (var i = 0; i < names.length; i++)
	{
		auxNames.push(names[i].getElementsByClassName('itemName')[0]);
	}
	names = auxNames;*/
	for (var i = 0; i < names.length - 1; i++)
	{
		for (var j = i + 1; j < items.length; j++)
		{
			if (names[i].value == names[j].value)
			{
				repetidos.push(names[i].id.split('_')[2]);
				repetidos.push(names[j].id.split('_')[2]);
			}
		}
	}//console.log(repetidos);
	validItemsNames = !repetidos.length;
	for (var i = 0; i < repetidos.length; i++)
	{
		document.getElementById('lblItem_' + repetidos[i]).innerHTML = '<class="lblRepeated"> (repeated name)</p>';
	}
	saveItems();//saveNames();
}
function verifyAxisNames()
{
	yAxisName = document.getElementById('yAxis_name').value;
	xAxisName = document.getElementById('xAxis_name').value;

	document.getElementById('lblYAxisRepeated').innerHTML = '';
	document.getElementById('lblXAxisRepeated').innerHTML = '';
	validAxisNames = true;
	if (document.getElementById('yAxis_name').value == document.getElementById('xAxis_name').value)
	{
		document.getElementById('lblYAxisRepeated').innerHTML = '<p class="lblRepeated"> (repeated name)</p>';
		document.getElementById('lblXAxisRepeated').innerHTML = '<p class="lblRepeated"> (repeated name)</p>';
		validAxisNames = false;
	}
	if (document.getElementById('xAxis_name').value == '')
	{
		document.getElementById('lblXAxisRepeated').innerHTML = '<p class="lblRepeated"> (empty name)</p>';
		validAxisNames = false;
	}
	if (document.getElementById('yAxis_name').value == '')
	{
		document.getElementById('lblYAxisRepeated').innerHTML = '<p class="lblRepeated"> (empty name)</p>';
		validAxisNames = false;
	}
}
function fillLists(axis = null)
{
	/*var values = [];
	for (var i = 0; i < items.length; i++)
	{
		values.push(items[i][axis + 'Value']);
	}*/
	//var values = [...yValues];
	var axisName = yAxisName;
	//var pre_idsOrder = [...pre_yIdsOrder];
	var itemsListSortable = yItemsListSortable;
	if (axis == 'x')
	{
		itemsListSortable = xItemsListSortable;
		//values = [...xValues];
		//pre_idsOrder = [...pre_xIdsOrder];
		axisName = xAxisName;
	}
	document.getElementById(axis + 'ItemsList').innerHTML = '';
	document.getElementById(axis + 'DivRange').innerHTML = '';
	var c = document.getElementById('itemsList').children;
	//for (var i = 0; i < namesMaster.length; i++)
	for (var i = 0; i < items.length; i++)
	{
		$("#" + axis + "ItemsList").append(`
			<div class="` + axis + `Item" id="` + axis + `_item_` + items[i]['index'] + `">
				<label class="itemName">` + items[i]['name'] + `</label>
			</div>`
		);
	}
	itemsListSortable.removeContainer(document.getElementById(axis + 'ItemsList'));
	document.getElementById('lblChange' + axis.toUpperCase()).innerHTML = '';
	document.getElementById('opt' + axis.toUpperCase() + 'm').disabled = true;//for (var i = 0; i < namesMaster.length; i++)
	for (var i = 0; i < items.length; i++)
	{
		var v = items[i][axis + 'Value'];
		var top = document.getElementById(axis + '_item_' + items[i]['index']).offsetTop;
		var right = document.getElementById(axis + '_item_' + items[i]['index']).offsetLeft;
		$("#" + axis + "DivRange").append('<div class="rangeDiv" style="top: ' + top + 'px; right: ' + right + 'px;"><label class="lblLow' + axis.toUpperCase() + '">Low ' + axisName + '</label><input type="range" id="range_' + axis + '_item_' + items[i]['index'] + '" value="' + v + '" class="' + axis.toUpperCase() + 'Range custom-range" min="0" max="100" ondrag="verifyDifferentValues(\'' + axis + '\')" onchange="verifyDifferentValues(\'' + axis + '\')"><label class="lblHigh' + axis.toUpperCase() + '">High ' + axisName + '</label></div>');
	}
}
function updateCreateList(axis)
{//Used?
	var auxItems = [];
	var c = document.getElementById(axis + 'ItemsList').children;
	if (c.length)
	{
		document.getElementById('itemsList').innerHTML = '';
	    for (var i = 0; i < c.length; i++)
	    {
	    	for (var j = 0; j < items.length; j++)
	    	{
	    		if (items[j]['index'] == Number(c[i].id.split('_')[2]))
	    		{
	    			auxItems.push(items[j]);
	    		}
	    	}
	    	$("#itemsList").append(`
				<div id="item_` + c[i].id.split('_')[2] + `">
					<input class="itemName" type="text" value="` + c[i].getElementsByClassName('itemName')[0].innerHTML + `" id="item_name_` + c[i].id.split('_')[2] + `">
					<button class="deleteItemButton" id="` + c[i].id.split('_')[2] + `" onclick="deleteItem(this.id);">Delete</button>
					<label class="lblRepeatedItem" id="lblItem_` + c[i].id.split('_')[2] + `"></label>
				</div>`
			);
	    }
	}
	items = auxItems;
}
function getNames()
{
	for (var i = 0; i < items.length; i++)
	{
		items[i]['name'] = '';
	}
	//namesMaster = [];
	var c = document.getElementById('itemsList').children;
	for (var i = 0; i < c.length; i++)
	{
		if (items.length)
		{
			//namesMaster.push(document.getElementById('item_name_' + c[i].id.split('_')[1]).value);
			if (i < items.length)
			{
				items[i]['name'] = document.getElementById('item_name_' + c[i].id.split('_')[1]).value;
			}
			else
			{
				items.push({
					'name': document.getElementById('item_name_' + c[i].id.split('_')[1]).value, 
					'yValue' : 50, 
					'xValue' : 50, 
					'index' : Number(c[i].id.split('_')[1])
				});
			}
		}
		else
		{
			items.push({
				'name': document.getElementById('item_name_' + c[i].id.split('_')[1]).value, 
				'yValue' : 50, 
				'xValue' : 50, 
				'index' : Number(c[i].id.split('_')[1])
			});
		}
		document.getElementById('lblItem_' + c[i].id.split('_')[1]).innerHTML = '';
	}
}
function getItems()
{//console.log();//here
	if (validItemsNames && validAxisNames)
	{
		var ok = true;
		var ids = [];
		var c = document.getElementById('itemsList').children;
		for (var i = 0; i < c.length; i++)
		{
			if (c[i]['id'].length)
			{
				if (ids.indexOf(c[i]['id']) == -1)
				{
					ids.push(c[i]['id']);
					ok = true;
				}
				else
				{
					ok = false;
					i = c.length;
				}
			}
			else
			{
				ok = false;
				i = c.length;
			}
		}
		if (ok)
		{
			var auxItems = [];
			for (var i = 0; i < c.length; i++)
			{
				var auxYValue;
				var auxXValue;
				for (var j = 0; j < items.length; j++)
				{console.log(items[j]['index'], Number(c[i].id.split('_')[1]));
					if (items[j]['index'] == Number(c[i].id.split('_')[1]))
					{
						auxYValue = items[j]['yValue'];
						auxXValue = items[j]['xValue'];
					}
				}//console.log(auxYValue, auxXValue);
				auxItems.push({
					'name' : document.getElementById('item_name_' + c[i].id.split('_')[1]).value, 
					'index' : Number(c[i].id.split('_')[1]), 
					'yValue' : auxYValue, 
					'xValue' : auxXValue
				});
				document.getElementById('lblItem_' + c[i].id.split('_')[1]).innerHTML = '';
			}
			items = auxItems;
			localStorage.setItem('items', JSON.stringify(items));
		}
		else
		{
			setTimeout(() => { getItems(); }, 100);
		}
	}
}