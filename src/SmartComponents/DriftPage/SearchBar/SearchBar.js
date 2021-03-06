import React, { Component } from 'react';
import { Form, FormGroup, TextInput } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: this.props.factFilter
        };

        this.setFactFilter = this.setFactFilter.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.factFilter !== '' && this.props.factFilter === '') {
            this.setState({ filter: this.props.factFilter });
        }
    }

    async addToActiveFactFilters(filter) {
        const { handleFactFilter, setHistory } = this.props;

        await handleFactFilter(filter);
        setHistory();
    }

    updateFactFilter = (filter) => {
        this.setState({ filter });
        this.setFactFilter(filter);
    }

    setFactFilter = _.debounce(async function(filter) {
        await this.props.filterByFact(filter);
        this.props.setHistory();
    }, 250);

    checkKeyPress = (event) => {
        const { activeFactFilters } = this.props;
        const { filter } = this.state;

        if (event.key === 'Enter') {
            event.preventDefault();
            if (!activeFactFilters.includes(filter)) {
                this.addToActiveFactFilters(filter);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Form>
                    <FormGroup
                        isRequired
                        type="text"
                        fieldId="filter"
                        onKeyPress={ this.checkKeyPress }
                    >
                        <TextInput
                            value={ this.state.filter }
                            id="filterByFact"
                            placeholder="Filter by fact"
                            onChange={ this.updateFactFilter }
                            aria-label="filter by fact"
                            data-ouia-component-type="PF4/TextInput"
                            data-ouia-component-id="fact-filter-input-comparison"
                        />
                    </FormGroup>
                </Form>
            </React.Fragment>
        );
    }
}

SearchBar.propTypes = {
    filterByFact: PropTypes.func,
    factFilter: PropTypes.string,
    handleFactFilter: PropTypes.func,
    activeFactFilters: PropTypes.array,
    setHistory: PropTypes.func
};

export default SearchBar;
