import React, { Component } from 'react';
import Loading from '../../components/Loading/Loading';
import ApiService from '../../api/api.service';
import InputSearch from '../../components/InputSearch/InputSearch';
import Pagination from '../../components/Pagination/Pagination';
import Notifications from '../../components/Notifications/Notifications';
import Modal from 'react-modal'; // Import the react-modal library
import './Creators.css';

class Comics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
        perPage: 12,
        offset: 0,
        total: 0
      }, 
      search: '',
      loading: true,
      error: false,
      selectedComic: null, // Track the selected comic for modal display
      isModalOpen: false // Track the modal state
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async (search) => {
    await this.setState({
      loading: true,
      search
    });

    let query = this.state.search ? `&titleStartsWith=${this.state.search}` : '';
    query += `&orderBy=-modified&limit=${this.state.pagination.perPage}&offset=${this.state.pagination.offset}`;

    ApiService()
      .getData('comics', query)
      .then((response) => {
        if (response.status !== 200) throw new Error('Error');
        return response.json();
      })
      .then((response) => {
        this.setState((prevState) => ({
          data: response.data.results,
          pagination: {
            ...prevState.pagination,
            total: response.data.total,
            offset: this.state.search ? 0 : prevState.pagination.offset
          },
          loading: false
        }));
      })
      .catch((err) => {
        console.log('error', err);
        this.setState({
          error: true,
          loading: false
        });
      });
  };

  toggleClassActive = (comic) => {
    this.setState((prevState) => ({
      selectedComic: comic,
      isModalOpen: !prevState.isModalOpen
    }));
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  pageSelected = (currentPage) => {
    this.setState(
      (prevState) => ({
        pagination: { ...prevState.pagination, offset: currentPage }
      }),
      () => this.getData(this.state.search)
    );
  };

  searchRegister = (search) => {
    this.setState(
      (prevState) => ({
        pagination: { ...prevState.pagination, offset: 0, total: 0 }
      }),
      () => this.getData(search)
    );
  };

  render() {
    return (
      <div className="container-comics">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: "center" ,margin: "20px 0 10px 0"}}>
          <h1  style={{ margin: "0" }}>Comics</h1>
          <InputSearch className="input__group--comics" placeHolder="Title starts with" onSearch={this.searchRegister} />
        </div>
        <div className="container__cards container__cards--comics">
          {this.state.loading ? (
            <Loading />
          ) : (
            <React.Fragment>
              {this.state.error ? (
                <Notifications error={true} />
              ) : (
                <React.Fragment>
                  {this.state.data.length ? (
                    <React.Fragment>
                      {this.state.data.map((comic) => (
                        <div
                          key={comic.id}
                          className="card card--comic"
                          data-id={comic.id}
                          onClick={() => this.toggleClassActive(comic)}
                        >
                          <img
                            className="card__image"
                            src={`${comic.thumbnail.path}/standard_large.${comic.thumbnail.extension}`}
                            alt={comic.title}
                          />
                          <h3 className="card__title card__title--comic">{comic.title ? comic.title : 'TITLELESS'}</h3>
                        </div>
                      ))}
                    </React.Fragment>
                  ) : (
                    <Notifications />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
        <Pagination className="pagination-comics" pageSelected={this.pageSelected} data={this.state.pagination} />

        <Modal
  isOpen={this.state.isModalOpen}
  onRequestClose={this.closeModal}
  contentLabel="Comic Details"
  className="modal"
  overlayClassName="modal-overlay"
>
  {this.state.selectedComic && (
    <div>
      <h2>{this.state.selectedComic.title}</h2>
      <img
        className="modal__image"
        src={`${this.state.selectedComic.thumbnail.path}/standard_large.${this.state.selectedComic.thumbnail.extension}`}
        alt={this.state.selectedComic.title}
      />
      {this.state.selectedComic.description ? (
        <p>{this.state.selectedComic.description}</p>
      ) : (
        <p className="no-description">No Description of this comic</p>
      )}
      <button onClick={this.closeModal}>Close</button>
    </div>
  )}
</Modal>

      </div>
    );
  }
}

export default Comics;