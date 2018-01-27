import React                     from 'react';
import { connect }               from 'react-redux';
import { bindActionCreators }    from 'redux';
import styles                    from './styles.css';
import { 
  fetchDonations,
  createDonationEvent
}                                 from 'actions/donations';
import { auth }                   from 'utilities/auth';
import TextField                  from 'material-ui/TextField';
import RaisedButton               from 'material-ui/RaisedButton';
import FlatButton                 from 'material-ui/FlatButton';
import GoogleMapReact             from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



const AnyReactComponent = ({ text }) => <div>{text}</div>;



class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      size: 0,
      name: '',
      type: '',
      zoom: 11,
      lat: null,
      lng: null,
    }
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  componentWillMount() {
    let posLat
    let posLng
    navigator.geolocation.getCurrentPosition.bind(this,function(location) {
      
    });
    
  }

  showPosition = (location) => {
    let posLat = location.coords.latitude
    let posLng = location.coords.longitude
    this.props.fetchData(auth.headers(), {posLat, posLng})
  }
  handleClick = (url) => {
    this.props.onLeftIconButtonTouchTap()
    this.props.history.push(url);
  }

  generateRows = () => {
    return _.map(this.props.donations, (donation, donation_idx) => {
      return this.getColumns(donation)

    })
  }

  getColumns = (donation) => {
    return <tr key={donation.id}>
      <th>{donation.name || '-'}</th>
      <th>{donation.blood_type || '-'}</th> 
      <th>Actual size</th> 
      <th>{donation.size || '-'}</th>
    </tr>
  }


  handleChangename = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeBloodType = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  handleChangeSize = (event) => {
    this.setState({
      size: event.target.value,
    });
  };

  handleClick = (event) => {
    let name = this.state.name
    let size = this.state.size
    let type = this.state.type
    let lat = this.state.size
    let lng = this.state.type
    const creds = { name, size, type , lat, lng};
    this.props.createDonationEvent(auth.headers(), creds)
    
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    let lat = clickEvent.latLng.lat()
    let lng = clickEvent.latLng.lng()
    this.setState({
      lat,
      lng
    })
    debugger
  }

  render () {
    let { open, title, onLeftIconButtonTouchTap } = this.props;
    return (
      <div>
        <div className={styles['image-body']}>
        <div className={styles['email-wrapper']} >
          <TextField
            hintText="name"
            ref='name'
            className={styles['field']}
            underlineShow={false}
            value={this.state.name}
            onChange={this.handleChangeName}
          />
          <TextField
            hintText="Blood Type"
            ref='blood_type'
            className={styles['field']}
            underlineShow={false}
            value={this.state.type}
            onChange={this.handleChangeBloodType}
          />
          <TextField
            type='number'
            hintText="Size"
            ref='size'
            className={styles['field']}
            underlineShow={false}
            value={this.state.size}
            onChange={this.handleChangeSize}
          />
          <RaisedButton
            label="Submit"
            primary={true}
            className={styles['button']}
            onClick={(event) => this.handleClick(event)}
          />

          <div>
            <Map
            style={{width: '50%', height: '50%', position: 'relative'}}
            google={this.props.google}
            onClick={this.onMapClicked}
            >
            </Map>
          </div>
        </div>
      </div>
        <table>
          {this.generateRows()}
        </table>
      </div>
    );
  }
}

Dashboard = GoogleApiWrapper({
  apiKey: 'AIzaSyDKp8YVeKkJsSnDncTBVICRfzGNAuob8Rs'
})(Dashboard)

function mapStateToProps (state) {
  return {
    donations: state.donations.dashboard,
  };
};
function mapDispatchToProps (dispatch) {
  return {
    fetchData: bindActionCreators(fetchDonations, dispatch),
    createDonationEvent: bindActionCreators(createDonationEvent, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
