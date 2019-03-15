import React from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Typography from 'components/Typography';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { searchAction } from './actions';

class SearchPage extends React.PureComponent {
  render() {
    const { searchReducer } = this.props;
    const { searchResults } = searchReducer;
    const { data, loading, error } = searchResults;
    const perChunk = 4;

    const chunkData = data.reduce((all, one, idx) => {
      const ch = Math.floor(idx / perChunk);
      all[ch] = [].concat(all[ch] || [], one);
      return all;
    }, []);
    const colors = ['', 'top', 'left', 'right'];
    return (
      <Page title="Search Results">
        {error && (
          <Typography type="h4">
            Something went wrong, please try again.
          </Typography>
        )}
        {loading && (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {!loading && data.length > 0 && (
          <Row>
            {chunkData.map(item => {
              return item.map((cardItem, idx) => {
                const color = colors[idx];
                return (
                  <Col key={cardItem} md={4} sm={6} xs={12} className="mb-3">
                    <Card
                      inverse
                      className={`border-0 bg-gradient-theme${
                        !!color ? '-' : ''
                      }${color}`}
                      style={{
                        height: 200,
                      }}
                    >
                      <CardBody className="d-flex flex-column justify-content-start align-items-start">
                        <CardTitle>{cardItem}</CardTitle>
                      </CardBody>
                      <CardBody className="d-flex justify-content-between align-items-center">
                        <NavLink
                          to={`/stock/${cardItem}`}
                          activeClassName="active"
                          exact={true}
                        >
                          <Button outline color="light">
                            Click
                          </Button>
                        </NavLink>
                      </CardBody>
                    </Card>
                  </Col>
                );
              });
            })}
          </Row>
        )}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  getSearchList: () => dispatch(searchAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
