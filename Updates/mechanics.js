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
	var enemy_index = generateRandomNumber(game.monsters.length);
	var enemyInfo = [game.monsters[enemy_index].name, game.monsters[enemy_index].hp, game.monsters[enemy_index].gold, game.monsters[enemy_index].damage];
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
	var item_index = generateRandomNumber(game.items.length);
	var itemInfo = [game.items[item_index].name, game.items[item_index].chance];
	var item = {
		name: itemInfo[0],
		chance: itemInfo[1],
	}
	
	// Display Stats
	var showPlayerStats = document.getElementById("playerStats").innerHTML = getPlayer();
	var showEnemyStats = document.getElementById("EnemyStats").innerHTML = getEnemy();
	
	function skirmish(){
		// Declare Player
		showPlayerStats = document.getElementById("playerStats").innerHHTML = getPlayer();
		
		// Hide Item
		var showItem = document.getElementById("itemTracker").style.display = "none";
	
		// Attack
		var enemy_health = this.enemy.health;
		var player_health = this.player.health;
		var enemy_damage = this.enemy.damage;
		var player_damage = this.player.damage;
		
		if(enemy_health > 0 && player_health > 0){
		enemy_health = enemy_health - player_damage < 0 ? 0 : enemy_health -= player_damage;
		player_health = player_health - enemy_damage < 0 ? 0 : player_health -= enemy_damage;
		
		// Update Player Health
		setPlayer(player_health, this.player.damage, this.player.potions, this.player.gold);
		showPlayerStats = document.getElementById("playerStats").innerHTML = getPlayer();
		
		// Update Enemy Health
		setEnemy(this.enemy.name, enemy_health);
		showEnemyStats = document.getElementById("EnemyStats").innerHTML = getEnemy();
		
		}else if(enemy.health <= 0){
			showKillText = document.getElementById("killText").style.display = "block";
			showKillText = document.getElementById("killText").innerHTML = "You killed the " + enemy.name + " !";
			showContinueButton = document.getElementById("continueButton").style.display = "inline-block";
			showShopButton = document.getElementById("shopButton").style.display = "inline-block";
			
		}else if (player.health <= 0){
			setTimeout("location.reload(true);", 500);
			alert("The game is over! You Lose :(");
		}
	}
	
	function drinkPotion(){
		// Drink Potion
		var player_health = this.player.health;
		var player_potions = this.player.potions;
		
		if(player_health < 100 && player_potions >= 1){
			player_health = player_health + 10 > 100 ? 100 : player_health += 10;
			player_potions--;
			setPlayer(player_health, this.player.damage, player_potions, this.player.gold);
			showPlayerStats = document.getElementById("playerStats").innerHTML = getPlayer();
		}else if(player.potions === 0){ alert("You have no more potions!"); }else if(player.health === 100) { alert("Your max health is 100!"); }
	}
	
	function continueButton(){
		// Hide buttons
		showKillText = document.getElementById("killText").style.display = "none";
		showContinueButton = document.getElementById("continueButton").style.display = "none";
		showShopButton = document.getElementById("shopButton").style.display = "none";
		
		// Update Player Gold
		setPlayer(this.player.health, this.player.damage, this.player.potions, (this.player.gold += this.enemy.gold));
		showPlayerStats = document.getElementById("playerStats").innerHTML = getPlayer();
		
		// Get a new enemy
		var new_enemy_index = generateRandomNumber(game.monsters.length);
		getNewEnemy();
		setNewEnemy(this.enemy.name, this.enemy.health, this.enemy.gold, this.enemy.damage, this.enemy.image);
		showEnemyStats = document.getElementById("EnemyStats").innerHTML = getEnemy();
		
		// Update new item
		setItem(this.item.name, this.item.chance);
		getItem();
		rollChance();
		console.log(item.name);
	}
		
	function rollChance(){
		var dropRandomNumber = Math.random();
		if(this.item.chance > dropRandomNumber){
			console.log("you got: " + item.name);
			showItem = document.getElementById("itemTracker").style.display = "block";
			showItem = document.getElementById("itemTracker").innerHTML = "The " + this.enemy.name + " dropped a " + this.item.name + " !";
			if(this.item.name == "Potion"){
				var player_potion = this.player.potions;
				player_potion++;
				setPlayer(this.player.health, this.player.damage, player_potion, this.player.gold);
				getPlayer();
				console.log(this.player.potions);
			}
			if(this.item.name == "Sword"){
				var player_damage = this.player.damage += 4;
				setPlayer(this.player.health, player_damage, this.player.potions, this.player.gold);
				getPlayer();
				console.log(this.player.damage);
			}
		}
	}
	
	function getNewEnemy(){ 
		var new_enemy_index = generateRandomNumber(game.monsters.length);
		var enemyInfo = [game.monsters[new_enemy_index].name, game.monsters[new_enemy_index].hp, game.monsters[new_enemy_index].gold, game.monsters[new_enemy_index].damage, game.monsters[new_enemy_index].image];
		
		this.enemy.name = enemyInfo[0];
		this.enemy.health = enemyInfo[1];
		this.enemy.gold = enemyInfo[2];
		this.enemy.damage = enemyInfo[3];
		this.showEnemyImage = document.getElementById("enemyImage").src = game.monsters[new_enemy_index].image;
		}
		
	function setNewEnemy(name, health, gold, damage, image){ 
		this.enemy.name = name;
		this.enemy.health = health;
		this.enemy.gold = gold;
		this.enemy.damage = damage;
		this.showEnemyImage = image;
		}
		
	function getItem(){ 
		var new_item_index = generateRandomNumber(game.items.length);
		var itemInfo = [game.items[new_item_index].name, game.items[new_item_index].chance];
		
		this.item.name = itemInfo[0];
		this.item.chance = itemInfo[1];
	}
	
	function setItem(name, chance){ this.item.name = name; this.item.chance = chance }
	
	function getPlayer(){ return "Player: " + this.player.name + "<br />" + "Health: " + this.player.health + "<br />" + "Potions: " + this.player.potions + "<br />" + "Gold: " + this.player.gold; }
	function setPlayer(health, damage, potions, gold){ this.player.health = health; this.player.damage = damage; this.player.potions = potions; this.player.gold = gold; }
	
	function getEnemy(){ return "Enemy: " + enemy.name + "<br />" + "Health: " + enemy.health; }
	function setEnemy(name, health){ this.enemy.name = name; this.enemy.health = health; }
	
	function shop(){  }
	
	function generateRandomNumber(maxNumber){return Math.floor(Math.random()*maxNumber);}
