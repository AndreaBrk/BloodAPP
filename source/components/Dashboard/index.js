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
import {Map, InfoBox, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react';
import { compose, withProps } from "recompose"



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
      blood_type_filter: null,
      posLat: null,
      posLng: null,
      type_message: '',
      size_message: '',
      name_message: '',
      isOpen: true,
      showingInfoWindow: [],
      activeMarker: [],
      selectedPlace: {},
    }
    navigator.geolocation.getCurrentPosition(this.showPosition);
    this.setValues = this.setValues.bind(this);
  }


  showPosition = (location) => {
    let posLat = location.coords.latitude
    let posLng = location.coords.longitude
    this.setState({
      posLat,
      posLng
    })
    this.props.fetchData(auth.headers(), {posLat, posLng})
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
      <th>{donation.description || '-'}</th>
    </tr>
  }

  generateMarkers = () => {
    
  }


  handleChangeName = (event) => {
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

  setValues = () => {
    
  }

  handleClick = (event) => {
    let name = this.state.name
    let size = this.state.size
    let type = this.state.type
    let lat = this.state.size
    let lng = this.state.type
    let description = this.state.description
    debugger
    debugger
    let nmessage = ''
    let smessage = ''
    let tmessage = ''
    if (this.state.name == "" || this.state.name == null) {
      nmessage = "The name can't be blank"
    }

    if  (this.state.size == 0 || this.state.name == null) {
      smessage = "The size must be greater than 0"
    } 

    if (this.state.type == '' || this.state.name == null) {
      tmessage = "The type can't be blank"
    }
    debugger
    this.setState({
      type_message: tmessage,
      size_message: smessage,
      name_message: nmessage
    })
    if ((tmessage == '' && smessage== '' && nmessage == '')) {
      this.setState({
        type_message: '',
        size_message: '',
        name_message: ''
      })
      const creds = { name, size, type , lat, lng, description }
      this.props.createDonationEvent(auth.headers(), creds)
    }
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    let lat = clickEvent.latLng.lat()
    let lng = clickEvent.latLng.lng()
    this.setState({
      lat,
      lng
    })
  }

  handleBloodTypeFilter = (event) => {
    this.setState({
      blood_type_filter: event.target.value,
    });
  }

  handleChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  }


  handleFilter = () => {
    let posLat = this.state.posLat
    let posLng = this.state.posLng
    debugger
    this.props.fetchData(auth.headers(), {posLat, posLng, blood_type: this.state.blood_type_filter})
  }

  onToggleOpen = (id, props, marker, e) => {
    let showingInfoWindow = this.state.showingInfoWindow
    showingInfoWindow[id] = true
    let activeMarker = this.state.activeMarker
    activeMarker[id] = marker
    this.setState({
      selectedPlace: props,
      activeMarker: activeMarker,
      showingInfoWindow: showingInfoWindow
    });
  }

  onToggleClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: [],
        activeMarker: null
      })
    }
  }

  render () {
    return (
      <div>
        <div className={styles['image-body']}>
        <div className={styles['email-wrapper']} >
          <TextField
            hintText="name"
            ref='name'
            className={styles['field']}
            errorText={this.state.name_message}
            underlineShow={false}
            value={this.state.name}
            onChange={this.handleChangeName}
          />
          <TextField
            hintText="Blood Type"
            ref='blood_type'
            className={styles['field']}
            errorText={this.state.type_message}
            underlineShow={false}
            value={this.state.type}
            onChange={this.handleChangeBloodType}
          />
          <TextField
            type='number'
            hintText="Size"
            errorText={this.state.size_message}
            ref='size'
            min={0}
            className={styles['field']}
            underlineShow={false}
            value={this.state.size}
            onChange={this.handleChangeSize}
          />
          <TextField
            type='text'
            hintText="Description"
            ref='description'
            className={styles['field']}
            underlineShow={false}
            value={this.state.description}
            onChange={this.handleChangeDescription}
          />
          <RaisedButton
            label="Submit"
            primary={true}
            className={styles['button']}
            onClick={(event) => this.handleClick(event)}
          />

        </div>
      </div>
      <div>
        <div>
          Filtros:
          <TextField
            hintText="Blood Type"
            ref='blood_type_filter'
            className={styles['field']}
            underlineShow={false}
            value={this.state.blood_type_filter}
            onChange={this.handleBloodTypeFilter}
          />

          <RaisedButton
            label="Submit"
            primary={true}
            className={styles['button']}
            onClick={(event) => this.handleFilter(event)}
          />
        </div>
        <table>
          {this.generateRows()}
        </table>
      </div>

      <div>
          <Map
            style={{width: '70%', height: '80%', position: 'relative'}}
            google={this.props.google}
            onClick={this.onMapClicked}
            defaultCenter={{ lat: -38, lng: -62 }}
            >
            { _.map(this.props.donations, (donation, donation_idx) => {
                return [<Marker
                    position={{ lat: donation.lat, lng: donation.lng }}
                    onClick={this.onToggleOpen.bind(this, donation.id)}
                  >
                  </Marker>,
                  <InfoWindow
                    marker={this.state.activeMarker[donation.id]}
                    visible={this.state.showingInfoWindow[donation.id]}>
                      <div>
                        <h1>{donation.blood_type || '-'}</h1>
                      </div>
                  </InfoWindow>]
                  
              })
            }

            
          </Map>  
        </div>
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
