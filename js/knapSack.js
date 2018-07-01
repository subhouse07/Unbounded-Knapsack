//Globals to keep track of items entered and maximize knapsack iteratively
var knapSacks = [];
var items = [];
var itemCount = 0;

window.onload = function() {
	document.getElementById("bagCap").value = "";
	document.getElementById("maxValue").value = "";
}

function addItem() {
	
	//Clear any error messages & maxValue field (in case of an itemless knapsack)
	document.getElementById("capErr").innerHTML = "";
	document.getElementById("nameErr").innerHTML = "";
	document.getElementById("valErr").innerHTML = "";
	document.getElementById("weightErr").innerHTML = "";
	document.getElementById("maxValue").value = "";

	//Make an array of size 'bagCap+1' of empty knapsack objects
	var bagCap = parseInt(document.getElementById("bagCap").value);
	if (isNaN(bagCap) || bagCap < 0) {
		document.getElementById("capErr").innerHTML = "Capacity must be positive number.";
		return;
	} else {
		knapSacks = [];
		makeSacks(bagCap);
	}
	

	//Get item properties, validate and add to an array of item objects
	//Then increment item count
	var itemName = document.getElementById("iName").value;
	if (itemName == "") {
		document.getElementById("nameErr").innerHTML = "Item needs a name.";
		return;
	}
	var itemVal = parseInt(document.getElementById("iVal").value);
	if (isNaN(itemVal) || itemVal < 0) {
		document.getElementById("valErr").innerHTML = "Value must be a positive number.";
		return;
	}
	var itemWeight = parseInt(document.getElementById("iWeight").value);
	if (isNaN(itemWeight) || itemWeight < 0) {
		document.getElementById("weightErr").innerHTML = "Weight must be a positive number.";
	} else if (itemWeight > bagCap) {
		document.getElementById("weightErr").innerHTML = "Item won't fit in knapsack!";
		return;
	}

	var item = {iName:itemName, iVal:itemVal, iWeight:itemWeight, quantity:1};
	this.items[itemCount] = item;
	this.itemCount += 1;


	maximizeSack();		//Run the max function after each item is added
	displayResults();	//build table to display results
	clearInput();		//clear input fields and return focus to name field

	
}

function updateList() {

	document.getElementById("capErr").innerHTML = "";
	document.getElementById("nameErr").innerHTML = "";
	document.getElementById("valErr").innerHTML = "";
	document.getElementById("weightErr").innerHTML = "";
	document.getElementById("maxValue").value = "";

	var bagCap = parseInt(document.getElementById("bagCap").value);
	if (isNaN(bagCap) || bagCap < 0) {
		document.getElementById("capErr").innerHTML = "Capacity must be positive number.";
		return;
	} else {
		knapSacks = [];
		makeSacks(bagCap);
	}

	maximizeSack();		
	displayResults();
	clearInput();

}

//Function to make knapSack array
//Each one has a capacity of one more than the previous
function makeSacks(bagCap) {
	for (i = 0; i <= bagCap; i++) {
		this.knapSacks[i] = {items:undefined, cap:i, val:0};
	}
}

//maximizing function
function maximizeSack() {

	/*For each knapsack, iterate over every item in the global items array.
	The max value is achieved by maximizing each knapsack starting from capacity 0.
	For example an item of weight 3 is added to a knapsack of capacity 6 if the knapsack's value is 
	less than the value of the already maximized knapsack of capacity 3 + the new object of weight 3 */
	for (i = 0; i < this.knapSacks.length; i++) {
		for (j = 0; j < this.items.length; j++) {
			
			if (this.items[j].iWeight <= i) {
				
				//Function that determines whether or not the current item will maximize the value
				updateSack(i, (i - this.items[j].iWeight), j);
			}
		}
	}

}

//This function checks current value against a possible new value. Then adds item to knapsack
function updateSack(currMaxIndex, oldSackIndex, itemIndex) {
	
	//Knapsack is not updated
	if (this.knapSacks[currMaxIndex].val > (this.knapSacks[oldSackIndex].val + this.items[itemIndex].iVal))
	{		
		return;
	}
	
	//Knapsack is updated.
	this.knapSacks[currMaxIndex] = JSON.parse(JSON.stringify(this.knapSacks[oldSackIndex]));
	this.knapSacks[currMaxIndex].val += this.items[itemIndex].iVal;

	if (this.knapSacks[currMaxIndex].items != undefined) {
						
		/*Iterates over the items within the knapsack to see if an item quantity
		needs to be updated. This is to have the information to display once the
		maximizing process is done. */
		for (k = 0; k < this.knapSacks[currMaxIndex].items.length; k++) {
			if (this.knapSacks[currMaxIndex].items[k].iName == this.items[itemIndex].iName) {
				this.knapSacks[currMaxIndex].items[k].quantity += 1;
				break;
			}

			//If you arrive at the end of the loop, add this item to the knapsack
			if (k == this.knapSacks[currMaxIndex].items.length-1) {
				this.knapSacks[currMaxIndex].items[k+1] = this.items[itemIndex];
				k++;
			}
		}

		//If no items in the knapsack yet, initalize and define the first index.
		} else {
			this.knapSacks[currMaxIndex].items = [];
			this.knapSacks[currMaxIndex].items[0] = this.items[itemIndex];
		}		
	return;
}

function displayResults() {

	//New item properties to be appended to table
	var itemName;
	var itemVal;
	var itemWeight;
	var itemQuantity;
	var itemTotValue;

	//Table nodes to add
	var tblRow;
	var cellName;
	var cellVal;
	var cellWeight;
	var cellQuantity;
	var cellTotValue;

	//DOM table node and child to be replaced on each run
	var parentNode = document.getElementById("resultsTable");
	var rowNodes = document.getElementsByClassName("resRows");
	if (rowNodes != null) {
		for (i = 0; i < rowNodes.length; i++) {
			parentNode.removeChild(rowNodes[i]);
			i--;
		}
	}
	

	var k = knapSacks.length-1;
	
	//Create table rows
	for (i = 0; i < knapSacks[k].items.length; i++) {
		tblRow = document.createElement("TR");
		tblRow.setAttribute("class", "resRows");
		
		//Name
		cellName = document.createElement("TD");
		itemName = document.createTextNode(knapSacks[k].items[i].iName);
		cellName.appendChild(itemName);
		tblRow.appendChild(cellName);

		//Value
		cellVal = document.createElement("TD");
		itemVal = document.createTextNode(knapSacks[k].items[i].iVal);
		cellVal.appendChild(itemVal);
		tblRow.appendChild(cellVal);
		
		//Weight
		cellWeight = document.createElement("TD");
		itemWeight = document.createTextNode(knapSacks[k].items[i].iWeight);
		cellWeight.appendChild(itemWeight);
		tblRow.appendChild(cellWeight);
	
		//Quantity
		cellQuantity = document.createElement("TD");
		itemQuantity = document.createTextNode(knapSacks[k].items[i].quantity);
		cellQuantity.appendChild(itemQuantity);
		tblRow.appendChild(cellQuantity);

		//Total Value
		cellTotValue = document.createElement("TD");
		itemTotValue = document.createTextNode(
			knapSacks[k].items[i].quantity * knapSacks[k].items[i].iVal);
		cellTotValue.appendChild(itemTotValue);
		tblRow.appendChild(cellTotValue);

		parentNode.appendChild(tblRow);
		
	}

	document.getElementById("maxValue").value = knapSacks[k].val;
	
}

function clearInput() {

	document.getElementById("iName").value = "";
	document.getElementById("iWeight").value = "";
	document.getElementById("iVal").value = "";
	document.getElementById("iName").focus();

}
