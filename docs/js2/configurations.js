var validItemsNames = true;
var validAxisNames = true;
var namesMaster = [];
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
				getNames();
				saveNames();
				saveAxisNames();
				getPreviousIdsOrder();
				getValues();
				fillLists('x');
				document.getElementById("createDiv").style.display = "none";
				document.getElementById("seeDiv").style.display = "none";
				document.getElementById("rateXDiv").style.display = "none";
				if (!(document.getElementById("rateYDiv").style.display == 'block'))
				{
					document.getElementById("rateYDiv").style.display = "block";
					getPreviousIdsOrder();
					getValues();
					fillLists('y');
				}
				var itemsListSortable = yItemsListSortable;
				itemsListSortable.removeContainer(document.getElementById('yItemsList'));
				itemsListSortable.addContainer(document.getElementById('yItemsList'));
				sortItems('y');
				break;
			case "rateX":
				getNames();
				saveNames();
				saveAxisNames();
				getPreviousIdsOrder();
				getValues();
				fillLists('y');
				document.getElementById("createDiv").style.display = "none";
				document.getElementById("seeDiv").style.display = "none";
				document.getElementById("rateYDiv").style.display = "none";
				if (!(document.getElementById("rateXDiv").style.display == 'block'))
				{
					document.getElementById("rateXDiv").style.display = "block";
					getPreviousIdsOrder();
					getValues();
					fillLists('x');
				}
				var itemsListSortable = xItemsListSortable;
				itemsListSortable.removeContainer(document.getElementById('xItemsList'));
				itemsListSortable.addContainer(document.getElementById('xItemsList'));
				sortItems('x');
				break;
			case "see":
				getNames();
				saveNames();
				saveAxisNames();
				fillAxisNames();
				document.getElementById("createDiv").style.display = "none";
				document.getElementById("rateYDiv").style.display = "none";
				document.getElementById("rateXDiv").style.display = "none";
				document.getElementById("seeDiv").style.display = "block";
				getValues();
				getPreviousIdsOrder();
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
	//document.getElementById('opt' + axis.toUpperCase() + 'd').disabled = true;
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
		if (axis == 'y')
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
		}
		for (var i = 0; i < c.length; i++)
	    {
	        c[i].value = value;
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
function verifyDifferentValues(axis)
{
	//document.getElementById('opt' + axis.toUpperCase() + 'd').disabled = true;
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
				//document.getElementById('opt' + axis.toUpperCase() + 'd').disabled = false;
				i = values.length;
			}
		}
		/*if (
			//document.getElementById('opt' + axis.toUpperCase() + 'd').disabled && 
			(document.getElementById('slcActions' + axis.toUpperCase()).selectedIndex == 4))
		{
			document.getElementById('slcActions' + axis.toUpperCase()).selectedIndex = 0;
			document.getElementById('btnSubmitActions' + axis.toUpperCase()).disabled = true;
			document.getElementById('btnSubmitActions' + axis.toUpperCase()).className = 'buttonGrey';
		}*/
	}
}
function sortItems(axis)
{
	getValues();
	var auxValues = [];
	var axisName = yAxisName;
	for (var i = 0; i < yValues.length; i++)
	{
		auxValues.push([yValues[i], i]);
	}
	if (axis == 'x')
	{
		auxValues = [];
		axisName = xAxisName;
		for (var i = 0; i < xValues.length; i++)
		{
			auxValues.push([xValues[i], i]);
		}
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
    for (var i = 0; i < auxValues.length; i++)
	{
    	$("#" + axis + "ItemsList").append(`
			<div class="` + axis + `Item" id="` + axis + `_item_` + auxValues[i][1] + `">
				<label class="itemName">` + document.getElementById('item_name_' + auxValues[i][1]).value + `</label>
				<label id="value_` + axis + `_item_` + auxValues[i][1] + `" class="itemValue">` + auxValues[i][0] + `</label>
			</div>`
		);
	}
	var c = document.getElementById('itemsList').children;
	var a = document.getElementById(axis + 'ItemsList').children;
    for (var i = 0; i < c.length; i++)
    {
        if (Number(c[i].id.split('_')[1]) != Number(a[i].id.split('_')[1]))
        {
            i = c.length;
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
		<div id="item_` + nextId + `">
			<input class="itemName" type="text" value="Item ` + (nextId + 1) + `" id="item_name_` + nextId + `" onmouseup="itemsListSortable.removeContainer(document.getElementById('itemsList'));saveNames();" onmouseleave="itemsListSortable.addContainer(document.getElementById('itemsList'));">
			<button class="deleteItemButton" id="` + nextId + `" onclick="deleteItem(this.id);">Delete</button>
			<label class="lblRepeatedItem" id="lblItem_` + nextId + `"></label>
		</div>`
	);
	document.getElementById(c[0].id.split('_')[1]).disabled = false;
	document.getElementById(c[0].id.split('_')[1]).className = 'itemBackGround';
	verifyItemsNames();
	saveNames();
}
function deleteItem(item)
{
	var items = document.getElementById('itemsList').children;
	var flag = false;
	var valuesCopy = [];
	var initialId;
	for (var i = 0; i < items.length; i++)
	{
		if (flag)
		{
			valuesCopy.push([document.getElementById('range_y_item_' + items[i].id.split('_')[1]).value, document.getElementById('range_x_item_' + items[i].id.split('_')[1]).value]);
		}
		if (items[i].id.split('_')[1] == item)
		{
			flag = true;
			initialId = i;
		}	
	}

	$('#item_' + Number(item)).remove()
	var j = 0;
	items = document.getElementById('itemsList').children;

	for (var i = 0; i < items.length; i++)
	{
		if (items[i].id.length)
		{
			var subItems = document.getElementById(items[i].id).children;
			for (var k = 0; k < subItems.length; k++)
			{
				subItems[k].id = subItems[k].id.replace(subItems[k].id.split('_')[subItems[k].id.split('_').length - 1], j);
			}
			items[i].id = 'item_' + j;
			j += 1;
		}
	}
	if (items.length == 1)
	{
		document.getElementById(items[0].id.split('_')[1]).disabled = true;
		document.getElementById(items[0].id.split('_')[1]).className = 'buttonGrey';
	}
	getNames();
	getPreviousIdsOrder();
	if (valuesCopy.length)
	{
		for (var i = 0; i < valuesCopy.length; i++)
		{
			document.getElementById('range_y_item_' + initialId).value = valuesCopy[i][0];
			document.getElementById('range_x_item_' + initialId).value = valuesCopy[i][1];
			initialId++;
		}
	}
	getValues();
	fillLists('y');
	fillLists('x');
	saveNames();
}
function verifyItemsNames()
{
	getNames();
	var repetidos = [];
	for (var i = 0; i < namesMaster.length - 1; i++)
	{
		for (var j = i + 1; j < namesMaster.length; j++)
		{
			if (namesMaster[i] == namesMaster[j])
			{
				repetidos.push(i);
				repetidos.push(j);
			}
		}
	}
	validItemsNames = !repetidos.length;
	for (var i = 0; i < repetidos.length; i++)
	{
		document.getElementById('lblItem_' + repetidos[i]).innerHTML = '<class="lblRepeated"> (repeated name)</p>';
	}
	saveNames();
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
	var values = [...yValues];
	var axisName = yAxisName;
	var pre_idsOrder = [...pre_yIdsOrder];
	var itemsListSortable = yItemsListSortable;
	if (axis == 'x')
	{
		itemsListSortable = xItemsListSortable;
		values = [...xValues];
		pre_idsOrder = [...pre_xIdsOrder];
		axisName = xAxisName;
	}
	document.getElementById(axis + 'ItemsList').innerHTML = '';
	var c = document.getElementById('itemsList').children;
	for (var i = 0; i < namesMaster.length; i++)
	{
		var v = 50;
		if (values.length)
		{
			v = values[Number(pre_idsOrder[i])];
		}
		$("#" + axis + "ItemsList").append(`
			<div class="` + axis + `Item" id="` + axis + `_item_` + c[i].id.split('_')[1] + `">
				<label class="itemName">` + namesMaster[i] + `</label>
				<label id="value_` + axis + `_item_` + pre_idsOrder[i] + `" class="itemValue">` + v + `</label>
			</div>`
		);
	}
	itemsListSortable.removeContainer(document.getElementById(axis + 'ItemsList'));
}
function updateCreateList(axis)
{//Not used.
	var c = document.getElementById(axis + 'ItemsList').children;
	if (c.length)
	{
		document.getElementById('itemsList').innerHTML = '';
	    for (var i = 0; i < c.length; i++)
	    {
	    	$("#itemsList").append(`
				<div id="item_` + c[i].id.split('_')[2] + `">
					<input class="itemName" type="text" value="` + c[i].getElementsByClassName('itemName')[0].innerHTML + `" id="item_name_` + c[i].id.split('_')[2] + `">
					<button class="deleteItemButton" id="` + c[i].id.split('_')[2] + `" onclick="deleteItem(this.id);">Delete</button>
					<label class="lblRepeatedItem" id="lblItem_` + c[i].id.split('_')[2] + `"></label>
				</div>`
			);
	    }
	}
}
function getNames()
{
	namesMaster = [];
	var c = document.getElementById('itemsList').children;
	for (var i = 0; i < c.length; i++)
	{
		namesMaster.push(document.getElementById('item_name_' + c[i].id.split('_')[1]).value);
		document.getElementById('lblItem_' + c[i].id.split('_')[1]).innerHTML = '';
	}
}