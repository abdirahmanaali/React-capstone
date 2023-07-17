import React, { Component } from 'react';
import './Pagination.css';

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start: 1,
            end: 5,
            current: 1
        }
        this.maxPagesToShow = 5;
    }
  
    componentDidUpdate(prevProps) {
        if (prevProps.data.total !== this.props.data.total) {
            this.setState({
                current: 1,
                start: 1,
                end: this.maxPaginationShow()
            });
        }
    }

    getNumberPage = () => {
        const { perPage, total } = this.props.data;
        return Math.ceil(total / perPage);
    }

    maxPaginationShow = () => {
        const numPage = this.getNumberPage();
        return numPage > this.maxPagesToShow ? this.maxPagesToShow : numPage;
    }

    firstPage = () => {
        if (this.state.current !== 1) {
            this.setState({
                current: 1,
                start: 1,
                end: this.maxPaginationShow()
            });
            this.props.pageSelected(0);
        }
    }

    nextPage = () => {
        const maxPages = this.getNumberPage();

        if (this.state.current !== maxPages) {
            const current = this.state.current + 1;
            const end = this.state.end + 1 > maxPages ? this.state.end : this.state.end + 1;
            const start = maxPages - this.state.start >= this.maxPaginationShow() ? this.state.start + 1 : this.state.start;
            this.setState({ current, start, end });

            const page = ((current - 1) * this.props.data.perPage) + 1;
            this.props.pageSelected(page);
        }
    }

    previousPage = () => {
        if (this.state.current !== 1) {
            const current = this.state.current - 1;
            const end = this.state.end - 1 < this.maxPaginationShow()  ? this.state.end : this.state.end - 1;
            const start = this.state.start - 1 >= 1 ? this.state.start - 1 : this.state.start;
            this.setState({ current, start, end });

            const page = ((current - 1) * this.props.data.perPage) + 1;
            this.props.pageSelected(page === 1 ? 0 : page);
        }
    }

    specificPage = (numberPage) => {
        if (this.state.current !== numberPage) {
            const maxPages = this.getNumberPage();
            const lastItem = numberPage + this.maxPagesToShow;
            const end = lastItem > maxPages ? maxPages : lastItem;
            const start = end - this.maxPagesToShow > 0 ? end - this.maxPagesToShow : this.state.start;
            this.setState({
                current: numberPage,
                start,
                end
            });
    
            const currentPage = ((numberPage - 1) * this.props.data.perPage) + 1;
            this.props.pageSelected(currentPage === 1 ? 0 : currentPage);
        }
    }

    lastPage = () => {
        const numPage = this.getNumberPage();

        if (this.state.current !== numPage) {
            this.setState({
                current: numPage,
                start: this.maxPaginationShow() === numPage ? 1 : numPage - this.maxPagesToShow,
                end: numPage
            });

            const currentPage = ((numPage - 1) * this.props.data.perPage) + 1;
            this.props.pageSelected(currentPage);
        }
    }

    drawButtons = () => {
        let buttons = [];

        for (let index = this.state.start; index <= this.state.end; index++) {
            buttons.push(
                <button key={index}
                    onClick={() => this.specificPage(index)}
                    className={`pagination__button pagination__button--item ${this.state.current === index ? 'pagination__button--activate' : ''}`}>
                    {index}
                </button>
            );
        }

        return buttons;
    }

    render() {
        return (
            <div className={`pagination ${this.props.className ? this.props.className : ''}`}>
                <div className="pagination__container">
                    <button className="pagination__button" onClick={this.firstPage}><i className="material-icons">first_page</i></button>
                    <button className="pagination__button" onClick={this.previousPage}><i className="material-icons">chevron_left</i></button>
                    {this.drawButtons()}
                    <button className="pagination__button" onClick={this.nextPage}><i className="material-icons">chevron_right</i></button>
                    <button className="pagination__button" onClick={this.lastPage}><i className="material-icons">last_page</i></button>
                </div>
                <div className="pagination__info">
                    {this.props.data.perPage * this.state.start} of {this.props.data.total} <span className="pagination__info--span">Reg</span>
                </div>
            </div>
        );
    }
}

export default Pagination;