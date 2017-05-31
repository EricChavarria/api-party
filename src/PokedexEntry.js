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
    }

    componentWillReceiveProps(nextProps) {
        const nameChanged = (nextProps.name !== this.props.name)
        if (nameChanged) {
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
                <th>Type #{i+1}</th>
            )
            type.push(
                <td>{pokedex.types[i].type.name}</td>
            )
        }
        table.push(
            <table border="1">
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
                <th>{pokedex.stats[i].stat.name}</th>
            )
            tableData.push(
                <td>{pokedex.stats[i].base_stat}</td>
            )
        }
        table.push(
            <table border="1">
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
        var abilities = []
        var list = []
        const{ pokedex } = this.state
        if(!pokedex.types){
            return
        }
        for (var i = 0; i < pokedex.abilities.length; i++){
            list.push(
                <ul>
                    {pokedex.abilities[i].ability.name}
                </ul>
            )
        }
        abilities.push(
            <div>
                <h2>Abilities</h2>
                <ul>
                    {list}
                </ul>
            </div>
        )
        return abilities
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