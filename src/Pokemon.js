import React, { Component } from 'react'
import './Pokemon.css'
import PokedexEntry from './PokedexEntry'
import { Route } from 'react-router-dom'

class Pokemon extends Component {
    state = {
        pokemon: ''
    }

    handleChange = (ev) => {
        const pokemon = ev.currentTarget.value
        this.setState({ pokemon })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.props.history.push(`/pokemon/${this.state.pokemon}`)
    }

    render() {
        return (
            <div className="pokemon">
                <img className="pokemon-img" src="https://s-media-cache-ak0.pinimg.com/originals/90/c9/5f/90c95fdf8b1e7f1cbda882c96fb748bd.jpg" alt="pokemon" />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input 
                            type="text" 
                            value={this.state.pokemon}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Look up pokedex number</button>
                    </div>
                </form>

                <Route path='/pokemon/:pokemon' component={PokedexEntry} />
                <Route exact path='/pokemon' render={() => (
                    <h3>Please enter a pokedex number to search on pokeapi</h3>
                )} />
            </div>
        )
    }
}

export default Pokemon