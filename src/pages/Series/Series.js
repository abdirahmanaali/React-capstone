import React, { Component } from 'react';
import Loading from '../../components/Loading/Loading';
import ApiService from '../../api/api.service';
import InputSearch from '../../components/InputSearch/InputSearch';
import Pagination from '../../components/Pagination/Pagination';
import Notifications from '../../components/Notifications/Notifications';
import './Series.css';

class Series extends Component {
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
      error: false
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
    // query += `&orderBy=-startYear&limit=${this.state.pagination.perPage}&offset=${this.state.pagination.offset}`;

    ApiService()
      .getData('series', query)
      .then((response) => {
        if (response.status !== 200) throw new Error('Error');
        return response.json();
      })
      .then((response) => {
        this.setState((prevState) => ({
          data: response.data.results,
          pagination: { ...prevState.pagination, total: response.data.total },
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

  toggleTurn = (id) => {
    document.querySelector(`.card-device[data-id='${id}']`).classList.toggle('card-device--turn-on');
  };

  parseCreators = (data) => {
    const res = data.reduce((vp, vc) => {
      vp[vc.role] = vp.hasOwnProperty(vc.role) ? vp[vc.role].concat(vc.name) : [vc.name];
      return vp;
    }, {});
    const dataRender = Object.keys(res).map((el, index) => (
      <h5 key={index} className="fw-normal text-capitalize pl-1">
        <span className="emphasize text-white">{el}:</span> {res[el].join()}
      </h5>
    ));
    return dataRender;
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
      <div className="container-creators">
      <div style={{  display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: "center" ,margin: "20px 0 50px 0"}}>
  <h1 style={{  margin: "0"}}>Series</h1>
  <InputSearch className="input__group--creators s" placeHolder="Title starts with" onSearch={this.searchRegister} />
</div>
 
        <div className="container__cards container__cards--series">
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
                      {this.state.data.map((serie) => {
                        const imageUrl = `${serie.thumbnail.path}/standard_fantastic.${serie.thumbnail.extension}`;
                        const hasImage = imageUrl !== 'path/standard_fantastic.extension';

                        return (
                          <div key={serie.id} className="card-device" data-id={serie.id}>
                            {hasImage ? (
                              <img className="card__image" src={imageUrl} alt={serie.title} />
                            ) : (
                              <div className="no-image-placeholder">No Image Available</div>
                            )}
                            <div className="card__content-wrapper">
                              <div className="card-device__content">
                                <h5 className="fw-normal text-capitalize">
                                  <span className="emphasize text-white">Published: </span>
                                  {serie.startYear}
                                </h5>
                                <h5 className="fw-normal text-capitalize">
                                  <span className="emphasize text-white">Rating: </span>
                                  {serie.rated ? serie.rated : 'Unclassified'}
                                </h5>
                                <h5 className="fw-normal text-capitalize">
                                  <span className="emphasize text-white">Type: </span> {serie.type}
                                </h5>
                                <h5 className="fw-normal text-capitalize">
                                  <span className="emphasize text-white">End year: </span> {serie.endYear}
                                </h5>
                                <h5 className="fw-normal text-capitalize">
                                  <span className="emphasize text-white">Creators</span>
                                </h5>
                                {this.parseCreators(serie.creators.items)}
                                <h5 className="fw-normal text-capitalize mt-1">
                                  <span className="emphasize text-white">Description</span>
                                </h5>
                                {serie.description ? serie.description : 'No Data'}
                                <a className="card-creator__link" href={serie.urls[0].url} target="blank">
                                  {serie.urls[0].type}
                                </a>
                              </div>
                            </div>
                            <div className="card-device__info">
                              <h4 className="card-device__title">{serie.title}</h4>
                              <button className="card-device__button" onClick={() => this.toggleTurn(serie.id)}>
                                <i className="material-icons">power_settings_new</i>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    <Notifications />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
        <Pagination className="pagination-creators" pageSelected={this.pageSelected} data={this.state.pagination} />
      </div>
    );
  }
}

export default Series;
