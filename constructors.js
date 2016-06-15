/**
 * Creates a generic spell that can be cast.
 *
 * @name Spell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {string} description
 * @method   printDetails
 */

 function Spell(name, cost, description){
  this.name = name;
  this.cost = cost;
  this.description = description;
  cl('Spell name: ' + this.name + '; cost: ' + this.cost + '; description: ' + this.description);
  this.printDetails = function(){
    return 'name: ' + this.name + '; cost: ' + this.cost + '; description: ' + this.description;

  };
  }

  /**
   * Returns a string of all of the spell's details.
   * The format doesn't matter, as long as it contains the spell name, cost, and description.
   *
   * @name getDetails
   * @return {string} details containing all of the spells information.
   */

   Spell.prototype.getDetails = function(){
    return 'name: ' + this.name + '; cost: ' + this.cost + '; description: ' + this.description;
   };

/**
 * A spell that deals damage.
 * We want to keep this code DRY (Don't Repeat Yourself).
 *
 * So you should use `Spell.call()` to assign the spell name, cost, and description.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 *
 * In addition, you will also want to assign `DamageSpell.prototype`
 * a value so that it inherits from `Spell`.
 * Make sure to call this OUTSIDE of the function declaration.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype
 *
 * @name DamageSpell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {number} damage       The amount of damage this spell deals.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {number} damage
 * @property {string} description
 */

  function DamageSpell(name, cost, damage, description){
    this.damage = damage;
    cl('Spell name: ' + this.name + '; cost: ' + this.cost + '; description: ' + this.description + '; Damage: ' + this.damage);
    Spell.call(this, name, cost, description);
  }

  DamageSpell.prototype = Object.create(Spell.prototype, {
    constructor: DamageSpell
  }
  );

/**
 * Now that you've created some spells, let's create
 * `Spellcaster` objects that can use them!
 *
 * @name Spellcaster
 * @param {string} name         The spellcaster's name.
 * @param {number} health       The spellcaster's health points.
 * @param {number} mana         The spellcaster's mana points, used for casting spells.
 * @property {string} name
 * @property {number} health
 * @property {mana} mana
 * @property {boolean} isAlive  Default value should be `true`.
 * @method  inflictDamage
 * @method  spendMana
 * @method  invoke
 */

 function Spellcaster(name, health, mana) {
  this.name = name;
  this.health = health;
  this.mana = mana;
  this.isAlive = true;
  cl('Spellcaster: ' + this.name + '; health: ' + this.health + '; mana: ' + this.mana + '; isAlive: ' + this.isAlive);
  this.inflictDamage = function(damage) {
    cl('inflictDamage called on ' + this.name + '. Damage: ' + damage);
    this.health -= damage;
    cl(this.name + ' has been injured!');
    cl(this.name + '\'s remaining health: ' + this.health);
    if(this.health < 1){
      this.health = 0;
      this.isAlive = false;
      cl('He\'s dead, Jim.');
    }
  };
  this.spendMana = function(cost) {
    cl('spendMana called. Cost: ' + cost);
    cl(this.name + ' has ' + this.mana + ' mana.');
    var spellWasCast = false;
    if(this.mana >= cost){
      this.mana -= cost;
      spellWasCast = true;
    }
    cl(this.name + ' cast: ' + spellWasCast + '; remaining mana: ' + this.mana);
    return spellWasCast;
  };
  this.invoke = function(spell, target) {
  //is it a spell?
  if (spell instanceof Spell || spell instanceof DamageSpell) {
    //is there enough mana?
    if ( this.mana >= spell.cost ) {
      //is it a damage spell?
      if ( spell instanceof DamageSpell ) {
        //is the target a spellcaster?
        if ( target instanceof Spellcaster ) {
          target.inflictDamage(spell.damage);
        } else {
          //not a spellcaster
          return false;
        }
      }
      //mana or not enough mana
      return this.spendMana(spell.cost);
    }
  }
  //not a spell
  return false;
};



    //check how many parameters were passed
    /*
    let args = this.invoke.arguments;
    //can the spell be invoked?
    cl('\'invoke\' called. parameters: ' + args.length);
    cl('first param: ' + args[0]);
    if(args.length === 1){
      cl('there was only one parameter passed!');
      cl(Object.getOwnPropertyNames(args[0]));
      cl(args[0].name);
      cl('instance of spell: ' + (args[0] instanceof Spell || args[0] instanceof DamageSpell));
      if(args[0] instanceof Spell || args[0] instanceof DamageSpell) {
        return true;
      }
    }
    isSpell = spell instanceof Spell;
    isDamageSpell = spell instanceof DamageSpell;
    isSpellcaster = target instanceof Spellcaster;
    cl('Spellcaster: ' + isSpellcaster + '; target: ' + target.name);
    cl('isSpell: ' + isSpell);
    cl('isDamageSpell: ' + isDamageSpell);
    if(isSpellcaster && (isSpell || isDamageSpell)) {
      cl(this.name + ' will try to cast a spell!');
      cl('Spell \'' + spell.name + '\' invoked by ' + this.name + '; damage: ' + spell.damage + '; target: ' + target.name);
      var spellCast = this.spendMana(spell.cost);
      if(spellCast) {
        target.inflictDamage(spell.damage);
      } else {
        cl('invoke failed! ' + this.name + ' didn\'t have enough mana.');
        return false;
      }
    } else {
      return false;
    }
    */

 }

  /**
   * @method inflictDamage
   *
   * The spellcaster loses health equal to `damage`.
   * Health should never be negative.
   * If the spellcaster's health drops to 0,
   * its `isAlive` property should be set to `false`.
   *
   * @param  {number} damage  Amount of damage to deal to the spellcaster
   */

  /**
   * @method spendMana
   *
   * Reduces the spellcaster's mana by `cost`.
   * Mana should only be reduced only if there is enough mana to spend.
   *
   * @param  {number} cost      The amount of mana to spend.
   * @return {boolean} success  Whether mana was successfully spent.
   */

  /**
   * @method invoke
   *
   * Allows the spellcaster to cast spells.
   * The first parameter should either be a `Spell` or `DamageSpell`.
   * If it is a `DamageSpell`, the second parameter should be a `Spellcaster`.
   * The function should return `false` if the above conditions are not satisfied.
   *
   * You should use `instanceof` to check for these conditions.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
   *
   * Next check if the spellcaster has enough mana to cast the spell.
   * If it can cast a spell, it should lose mana  equal to the spell's cost.
   * If there is not enough mana, return `false`.
   *
   * If there is enough mana to cast the spell, return `true`.
   * In addition, if it is a `DamageSpell` reduce the target's health by the spell's damage value.
   *
   * Use functions you've previously created: (`inflictDamage`, `spendMana`)
   * to help you with this.
   *
   * @param  {(Spell|DamageSpell)} spell  The spell to be cast.
   * @param  {Spellcaster} target         The spell target to be inflicted.
   * @return {boolean}                    Whether the spell was successfully cast.
   */

cl = function(theValue){
  console.log(theValue);
};