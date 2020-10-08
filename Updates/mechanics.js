 	var game = {
		user: player,
		monsters: listOfMonsters,
		items: items
	}
	
	// Player Information
	var player = {
		name: player.name,
		health: player.hp,
		damage: player.damage,
		potions: player.potions,
		gold: 0
	}
	
	// Enemy Information
	var newEnemy = generateRandomNumber(game.monsters.length);
	var enemy_index = generateRandomNumber(game.monsters.length);
	var enemyInfo = [game.monsters[enemy_index].name, game.monsters[enemy_index].hp, game.monsters[enemy_index].gold, game.monsters[enemy_index].damage];
	var enemy_image = game.monsters[enemy_index].image;
	var showEnemyImage = document.getElementById("enemyImage").src = game.monsters[enemy_index].image;
		
	var enemy = {
		name: enemyInfo[0],
		health: enemyInfo[1],
		gold: enemyInfo[2],
		damage: enemyInfo[3],
		image: (function() {
			return showEnemyImage;
		 })()
	}
	
	
	// Item Information
	/* item_index = generateRandomNumber(game.items.length);
	var item_name = game.items[item_index].name;
	var item_chance = game.items[item_index].chance;
	var showItem;*/
	
	// Display Stats
	
	var showPlayerStats = document.getElementById("playerStats").innerHTML = getPlayer();
	var showEnemyStats = document.getElementById("EnemyStats").innerHTML = getEnemy();
	//
	
	function skirmish(){	
		showPlayerStats = document.getElementById("playerStats").innerHHTML = getPlayer();
	
		// Attack
		var enemy_health = this.enemy.health;
		var player_health = this.player.health;
		var enemy_damage = this.enemy.damage;
		var player_damage = this.player.damage;
		
		if(enemy_health > 0 && player_health > 0){
		enemy_health = enemy_health - player_damage < 0 ? 0 : enemy_health -= player_damage;
		player_health = player_health - enemy_damage < 0 ? 0 : player_health -= enemy_damage;
		
		// Update Player Health
		showPlayerStats = document.getElementById("playerStats").innerHTML = setPlayer(player_health, this.player.potions, this.player.gold);
		showPlayerStats = document.getElementById("playerStats").innerHTML = getPlayer();
		//Update Enemy Health
		showEnemyStats = document.getElementById("EnemyStats").innerHTML = setEnemy(this.enemy.name, enemy_health);
		showEnemyStats = document.getElementById("EnemyStats").innerHTML = getEnemy();
		//showItem = document.getElementById("itemTracker").style.display = "none";
		//
		}else if(enemy.health <= 0){
			showKillText = document.getElementById("killText").style.display = "block";
			showKillText = document.getElementById("killText").innerHTML = "You killed the " + enemy.name + " !";
			showContinueButton = document.getElementById("continueButton").style.display = "inline-block";
			showShopButton = document.getElementById("shopButton").style.display = "inline-block";
			
		}else if (player.health <= 0){
			setTimeout("location.reload(true);", 500);
			alert("The game is over! You Lose :(");
		}
		//
	}
	
	function drinkPotion(){
		// Drink Potion
		var player_health = this.player.health;
		var player_potions = this.player.potions;
		
		if(player_health < 100 && player_potions >= 1){
			player_health = player_health + 10 > 100 ? 100 : player_health += 10;
			player_potions--;
			showPlayerStats = document.getElementById("playerStats").innerHTML = setPlayer(player_health, player_potions, this.player.gold);
			showPlayerStats = document.getElementById("playerStats").innerHTML = getPlayer();
		}else if(player.potions === 0){ alert("You have no more potions!"); }else if(player.health === 100) { alert("Your max health is 100!"); }
	}
	
	function continueButton(){
		// Hide buttons
		showKillText = document.getElementById("killText").style.display = "none";
		showContinueButton = document.getElementById("continueButton").style.display = "none";
		showShopButton = document.getElementById("shopButton").style.display = "none";
		
		// Update Player Gold
		showPlayerStats = document.getElementById("playerStats").innerHTML = setPlayer(this.player.health, this.player.potions, (this.player.gold += this.enemy.gold));
		showPlayerStats = document.getElementById("playerStats").innerHTML = getPlayer();
		//
		
		
		
		/*
		
		// Roll loot chance
		var dropRandomNumber = Math.random();
		//console.log(dropRandomNumber);
		//console.log(item_chance);
		if(item_chance > dropRandomNumber){
			//console.log("Item can be found!");
			console.log(item_name);
			showItem = document.getElementById("itemTracker").style.display = "block";
			showItem = document.getElementById("itemTracker").innerHTML = "The " + enemy.name + " dropped a " + item_name + " !";
			if(item_name == "Potion"){
				this.player.potion++;
			}else {
				showItem = document.getElementById("itemTracker").innerHTML = "The " + enemy.name + " dropped a " + item_name + " !";
			}
		}
		
		*/
		
		// Get a new enemy
		
		
		
		
		
		
		
		// Get a new item
		/*var item_index = generateRandomNumber(game.items.length);
		var item_name = game.items[item_index].name;
		var item_chance = game.items[item_index].chance;*/
	}
		
	function shop(){  }

	function getNewEnemy(){	return enemy_index; }
	function setNewEnemy(newEnemy){ this.newEnemy = generateRandomNumber(game.monsters.length); this.newEnemy = newEnemy; }
	
	function getPlayer(){ return "Player: " + this.player.name + "<br />" + "Health: " + this.player.health + "<br />" + "Potions: " + this.player.potions + "<br />" + "Gold: " + this.player.gold; }
	function setPlayer(health, potions, gold){ this.player.health = health; this.player.potions = potions; this.player.gold = gold; }
	
	function getEnemy(){ return "Enemy: " + enemy.name + "<br />" + "Health: " + enemy.health; }
	function setEnemy(name, health){ this.enemy.name = name; this.enemy.health = health; }
	
	function generateRandomNumber(maxNumber){return Math.floor(Math.random()*maxNumber);}
