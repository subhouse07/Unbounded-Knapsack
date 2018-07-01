
var knapSacks = [];
var items = [];
var itemCount = 0;

function addItem() {

	var bagCap = parseInt(document.getElementById("bagCap").value);
	if (isNaN(bagCap)) {
		alert("Not a number");
	} else {
		makeSacks(bagCap);
	}

	var itemName = document.getElementById("iName").value;
	var itemVal = parseInt(document.getElementById("iVal").value);
	var itemWeight = parseInt(document.getElementById("iWeight").value);
	var item = {iName:itemName, iVal:itemVal, iWeight:itemWeight, quantity:1};
	this.items[itemCount] = item;
	this.itemCount += 1;

	maximizeSack();
}

function makeSacks(bagCap) {
	for (i = 0; i <= bagCap; i++) {
		this.knapSacks[i] = {items:undefined, cap:i, val:0, weight:0};
	}
}

function maximizeSack() {

	for (i = 0; i < this.knapSacks.length; i++) {
		for (j = 0; j < this.items.length; j++) {
			
			if (this.items[j].iWeight <= i) {

				if (sackIsUpdated(i, (i - this.items[j].iWeight), j) == true) {
					if (this.knapSacks[i].items != undefined) {
						
						for (k = 0; k < this.knapSacks[i].items.length; k++) {
							if (this.knapSacks[i].items[k].iName == this.items[j].iName) {
								this.knapSacks[i].items[k].quantity += 1;
								this.knapSacks[i].weight += this.items[j].iWeight;
								break;
							}

							if (k == this.knapSacks[i].items.length) {
								this.knapSacks[i].items[k] = this.items[j];
								this.knapSacks[i].weight += this.items[j].iWeight;
							}
						}

					} else {
						this.knapSacks[i].items = [];
						this.knapSacks[i].items[0] = this.items[j];
						this.knapSacks[i].weight += this.items[j].iWeight;
					}
				}
			}
		}
	}

	alert("Maxed Value: " + this.knapSacks[knapSacks.length-1].val);
	
}

function sackIsUpdated(currMaxIndex, oldSackIndex, itemIndex) {
	if (this.knapSacks[currMaxIndex].val > (this.knapSacks[oldSackIndex].val + this.items[itemIndex].iVal)) {		
		return false;
	}
		this.knapSacks[currMaxIndex] = Object.assign({}, this.knapSacks[oldSackIndex]);
		this.knapSacks[currMaxIndex].val += this.items[itemIndex].iVal;
		return true;
}


