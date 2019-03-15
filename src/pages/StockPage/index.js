import React from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Row,
  Table,
} from 'reactstrap';
import { loadStockPrice, setPeriod } from './actions';

class StockPage extends React.PureComponent {
  componentDidMount() {
    const { getStockPrice, stockReducer } = this.props;
    const { selectedPeriod } = stockReducer;
    getStockPrice(this.props.match.params.stockquote, selectedPeriod);
  }
  handlePeriodChange = val => {
    const { dispatch, getStockPrice } = this.props;
    dispatch(setPeriod(val));
    getStockPrice(this.props.match.params.stockquote, val);
  };
  render() {
    const { stockReducer } = this.props;
    const { selectedPeriod, stockPrice } = stockReducer;
    const { data, loading, error } = stockPrice;
    return (
      <Page title="Stock Results">
        <Row>
          <Col md={3}>
            <UncontrolledButtonDropdown>
              <DropdownToggle
                caret
                color="primary"
                className="text-capitalize m-1"
              >
                {selectedPeriod}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    this.handlePeriodChange('1m');
                  }}
                >
                  1m
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.handlePeriodChange('3m');
                  }}
                >
                  3m
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    this.handlePeriodChange('6m');
                  }}
                >
                  6m
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </Col>
          <Col md={9}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Close</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr style={{ textAlign: 'center' }}>
                    <td colSpan="2">
                      <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {error && (
                  <tr style={{ textAlign: 'center' }}>
                    <td colSpan="2">No Data Available</td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  data.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{item.date}</td>
                        <td>{item.close}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getStockPrice: (stockquote, period) =>
    dispatch(loadStockPrice(stockquote, period)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockPage);
