import React, { Component } from 'react'
import './PokedexEntry.css'

class PokedexEntry extends Component {
    state = {
        pokedex: {
            sprites: {
                front_default:''
            }
        }
    }

    constructor(props) {
        super(props)
        this.fetchUserData(props)
    }

    fetchUserData = (props) => {
        fetch(`http://pokeapi.co/api/v2/pokemon/${props.match.params.pokemon}`)
            .then(response => response.json())
            .then(pokedex => this.setState({ pokedex }))
            debugger
    }

    componentWillReceiveProps(nextProps) {
        const locationChanged = (nextProps.location !== this.props.location)
        debugger
        if (locationChanged) {
            this.fetchUserData(nextProps)
        }
    }

    pokemonType() {
        var table = []
        var typeNumber = []
        var type = []
        const { pokedex } = this.state
        if(!pokedex.types){
            return
        }
        for (var i = 0; i < pokedex.types.length; i++){
            typeNumber.push(
                <th key={i+1}>Type #{i+1}</th>
            )
            type.push(
                <td key={pokedex.types[i].type.name}>{pokedex.types[i].type.name}</td>
            )
        }
        table.push(
            <table className="typeTable">
                <caption>Type(s)</caption>
                <thead>
                    <tr>
                        {typeNumber}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {type}
                    </tr>
                </tbody>
            </table>
        )
        return table
    }

    pokemonStats() {
        var table = []
        var tableHeads=[]
        var tableData=[]
        const{ pokedex } = this.state
        if(!pokedex.types){
            return
        }
        for (var i = 0; i < pokedex.stats.length; i++){
            tableHeads.push(
                <th key={pokedex.stats[i].stat.name}>{pokedex.stats[i].stat.name}</th>
            )
            tableData.push(
                <td key={pokedex.stats[i].stat.url}>{pokedex.stats[i].base_stat}</td>
            )
        }
        table.push(
            <table className="StatTable">
                <caption>Stats</caption>
                <thead>
                <tr>
                    {tableHeads}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {tableData}
                </tr>
                </tbody>
            </table>
        )
        return table
    }

    pokemonAbilities() {
        var table = []
        var abilities = []
        var abilityNumber = []
        const{ pokedex } = this.state
        if(!pokedex.types){
            return
        }
        for (var i = 0; i < pokedex.abilities.length; i++){
            abilityNumber.push(
                <th key={pokedex.abilities[i].ability.url}>
                    Ability#{i+1}
                </th>
            )
            abilities.push(
                <td key={pokedex.abilities[i].ability.name}>
                    {pokedex.abilities[i].ability.name}
                </td>
            )
        }
        table.push(
            <table className="abilityTable">
                <caption>Abilities</caption>
                <thead>
                    <tr>
                        {abilityNumber}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {abilities}
                    </tr>
                </tbody>
            </table>
        )
        return table
    }

    render() {
        const { pokedex } = this.state
        return (
            <div className="pokedex-entry">
                <img src={pokedex.sprites["front_default"]} alt="pokemon"/>
                <h2>#{pokedex.id}</h2>
                <h2>{pokedex.name}</h2>
                <div className="type">{this.pokemonType()}</div>
                <div className="stats">{this.pokemonStats()}</div>
                <div className="abilities">{this.pokemonAbilities()}</div>
            </div>
        )
    }
}

export default PokedexEntry