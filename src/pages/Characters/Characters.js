import React, { Component } from 'react';
import ApiService from '../../api/api.service';
import CharacterInfo from '../../components/CharacterInfo/CharacterInfo';
import Pagination from '../../components/Pagination/Pagination';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import Notifications from '../../components/Notifications/Notifications';
import InputSearch from '../../components/InputSearch/InputSearch';
import './Characters.css';

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
         perPage: 12,
        offset: 0,
        total: 0
      },
      orderBy: 'name',
      search: '',
      comics: [],
      characterSelected: undefined,
      loading: true,
      error: false
    };
    this.sidebarActions = {
      comic: this.comicSelected,
      search: this.searchRegister,
      order: this.orderBy,
      changePagination: this.changePagination
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    await this.setState({ loading: true });

    let query = this.state.search ? `&nameStartsWith=${this.state.search}` : '';
    query += this.state.comics.length ? `&comics=${this.state.comics.join()}` : '';
    query += `&orderBy=${this.state.orderBy}&limit=${this.state.pagination.perPage}&offset=${this.state.pagination.offset}`;

    ApiService().getData('characters', query)
      .then(response => {
        if (response.status !== 200) throw new Error('Error');
        return response.json();
      })
      .then(response => {
        const characters = response.data.results;
        if (!this.state.search && this.state.comics.length === 0) {
          const randomCharacters = this.getRandomCharacters(characters, this.state.pagination.perPage);
          this.setState((prevState) => ({
            data: randomCharacters,
            pagination: { ...prevState.pagination, total: response.data.total },
            loading: false
          }));
        } else {
          this.setState((prevState) => ({
            data: characters,
            pagination: { ...prevState.pagination, total: response.data.total },
            loading: false
          }));
        }
      })
      .catch(err => {
        console.log('error', err);
        this.setState({
          error: true,
          loading: false
        });
      });
  };

  getRandomCharacters = (characters, count) => {
    const shuffled = characters.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  selectedCharacter = (id) => {
    this.setState({
      characterSelected: this.state.data.find(el => el.id === id)
    });
  };

  clearSelectedCharacter = () => {
    this.setState({
      characterSelected: undefined
    });
  };

  pageSelected = (currentPage) => {
    this.setState(
      (prevState) => ({
        pagination: { ...prevState.pagination, offset: currentPage }
      }),
      () => this.getData()
    );
  };

  changePagination = (perPage) => {
    this.setState(
      {
        pagination: { perPage, offset: 0, total: 0 }
      },
      () => this.getData()
    );
  };

  searchRegister = (search) => {
    this.setState(
      (prevState) => ({
        pagination: { ...prevState.pagination, offset: 0, total: 0 },
        search
      }),
      () => this.getData()
    );
  };

  orderBy = (order) => {
    this.setState(
      {
        orderBy: order ? '-name' : 'name'
      },
      () => this.getData()
    );
  };

  comicSelected = (idComic, isDeselected) => {
    if (isDeselected) {
      this.setState((prevState) => ({
        comics: prevState.comics.filter(el => el !== idComic)
      }));
    } else {
      this.setState((prevState) => ({
        comics: prevState.comics.concat(idComic)
      }));
    }
    this.getData();
  };

  render() {
    return (
      <div className="pos_relative">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: "center", margin: "20px 0 50px 0" }}>
          <h1 style={{ margin: "0" }}>Character</h1>
          <InputSearch className="input__group--creators s" placeHolder="Title starts with" onSearch={this.searchRegister} />
        </div>
        <div className="container__cards">
          {this.state.loading ? <Loading /> :
            <React.Fragment>
              {this.state.error ? <Notifications error={true} /> :
                <React.Fragment>
                  {this.state.data.length ?
                    <React.Fragment>
                      {this.state.data.map((character) => {
                        return <Card key={character.id}
                          selectedCharacter={this.selectedCharacter}
                          data={{ id: character.id, name: character.name, thumbnail: character.thumbnail }} />
                      })}
                    </React.Fragment> : <Notifications />}
                </React.Fragment>
              }
            </React.Fragment>
          }
        </div>
        <CharacterInfo data={this.state.characterSelected} close={this.clearSelectedCharacter} />
        <Pagination className="pagination-creators" pageSelected={this.pageSelected} data={this.state.pagination} />
      </div>
    );
  }
}

export default Characters;
