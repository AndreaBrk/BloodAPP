import React                     from 'react'
import { connect }               from 'react-redux'
import { bindActionCreators }    from 'redux'
import {
  fetchDonations,
  createDonationEvent,
  deleteDonationEvent,
  fetchMyDonations
}                                 from 'actions/donations'
import auth                       from 'auth'
import GoogleMapReact             from 'google-map-react'
import {Map, InfoBox, InfoWindow, Marker, GoogleApiWrapper, Polygon} from 'google-maps-react'
import cx                         from 'classnames'
import TextField                  from 'material-ui/TextField'
import RaisedButton               from 'material-ui/RaisedButton'
import FlatButton                 from 'material-ui/FlatButton'
import SelectField                from 'material-ui/SelectField'
import MenuItem                   from 'material-ui/MenuItem'
import Toggle                     from 'material-ui/Toggle'
import IconButton                 from 'material-ui/IconButton'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import AddLocationIcon              from 'material-ui/svg-icons/maps/add-location'
import MapIcon                      from 'material-ui/svg-icons/maps/map'
import ListIcon                     from 'material-ui/svg-icons/action/list'
import {red500, yellow500, blue500} from 'material-ui/styles/colors'
import NoData                       from './NoData'
import styles                       from './styles.css'


const AnyReactComponent = ({ text }) => <div>{text}</div>

/**
 * Componente encargado de renderizar el formulario de alta de nuevas solicitudes,
 * la lista de solicitudes actuales y el mapa en el que se ubican.
 */
class Dashboard extends React.Component {
  static defaultProps = {
    donations: []
  }

  constructor (props) {
    super(props)
    this.state = {
      size: null,
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
      onlyMine: false,
      message_warning: "Actualmente no se registran pedidos de donaciones.",
      isPos: true,
      posEsNull: true
    }
  }

  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition(this.showPosition,this.errorCallback)
  }

  errorCallback = (err) => {
    this.setState({
      message_warning: "Es necesario que la geolocalización esté activada"
    })
  }

  showPosition = (location) => {
    const posLat = location.coords.latitude
    const posLng = location.coords.longitude
    this.setState({
      posLat,
      posLng
    })
    this.props.fetchData(auth.headers(), {posLat, posLng})
  }

  generateMarkers = () => {

  }


  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleChangeBloodType = (event, key, payload) => {
    this.setState({
      type: payload,
    })
  }

  handleChangeSize = (event, newValue) => {
    this.setState({
      size: newValue,
    })
  }

  handleClick = (event) => {
    const vname = this.state.name
    const vsize = this.state.size
    const vtype = this.state.type
    const vlat = this.state.lat
    const vlng = this.state.lng
    const vposLat = this.state.posLat
    const vposLng = this.state.posLng
    const description = this.state.description

    let nmessage = ''
    let smessage = ''
    let tmessage = ''
    let visPos =  true
    if (vname === "" || vname === null) {
      nmessage = "El nombre no puede ser vacío"
    }

    if  (vsize === 0 || vsize === null) {
      smessage = "La cantidad debe ser mayor a 0"
    }

    if (vtype === '' || vtype === null) {
      tmessage = "El tipo no puede ser vacío"
    }

    if (vlat === '' || vlat === null ||vlng === '' || vlng === null) {
      visPos = false
    }

    this.setState({
      type_message: tmessage,
      size_message: smessage,
      name_message: nmessage,
      isPos: visPos,
      posEsNull: visPos
    })

    if ((tmessage === '' && smessage== '' && nmessage === '' && visPos)) {
      this.setState({
        type_message: '',
        size_message: '',
        name_message: '',
        isPos: true,
        size: 0,
        name: '',
        type: '',
        description: '',
        lat: null,
        lng: null,
        posEsNull: true
      })

      const creds = { name: vname, size: vsize, type: vtype , lat: vlat, lng: vlng, description }

      this.setState({
        isPos: true,
        posEsNull: true
      })

      this.props.createDonationEvent(auth.headers(), creds)
      .then((data) => {
        this.props.fetchData(auth.headers(), {posLat: vposLat, posLng: vposLng})
      })
    }
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat()
    const lng = clickEvent.latLng.lng()
    this.setState({
      lat,
      lng
    })
  }

  handleBloodTypeFilter = (event, key, payload) => {
    debugger
    this.setState({
      blood_type_filter: payload,
    })
  }

  handleChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    })
  }


  handleFilter = () => {
    const posLat = this.state.posLat
    const posLng = this.state.posLng
    debugger
    this.props.fetchData(auth.headers(), {blood_type: this.state.blood_type_filter, posLat, posLng})
  }

  onToggleOpen = (id, props, marker, e) => {
    const showingInfoWindow = this.state.showingInfoWindow
    showingInfoWindow[id] = true
    const activeMarker = this.state.activeMarker
    activeMarker[id] = marker
    this.setState({
      selectedPlace: props,
      activeMarker: activeMarker,
      showingInfoWindow: showingInfoWindow
    })
  }

  onToggleClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: [],
        activeMarker: null
      })
    }
  }

  handleToggleOnlyMine = (e, checked) => {
    this.setState({
      onlyMine: checked
    })
    if (!this.state.onlyMine) {
      this.props.fetchMyDonations(auth.headers())
    } else {
      const posLat = this.state.posLat
      const posLng = this.state.posLng
      this.props.fetchData(auth.headers(), {posLat, posLng})
    }

  }


  handleDelete = (donation) => {
    const params = {
      id: donation.id
    }
    this.props.deleteDonationEvent(auth.headers(), params)
  }


  row = (donations) => {
    return _.map(donations, (donation, donation_idx) => (
      <TableRow key={donation.id}>
        <TableRowColumn >{donation.name || '-'}</TableRowColumn>
        <TableRowColumn >{donation.blood_type || '-'}</TableRowColumn>
        <TableRowColumn >{donation.size || '-'}</TableRowColumn>
        <TableRowColumn colSpan={3} >{donation.description || '-'}</TableRowColumn>
        <TableRowColumn>
          {donation.user_id === auth.user().id &&
          <IconButton iconClassName="material-icons" onClick={this.handleDelete.bind(this, donation)} >delete</IconButton>
          }
        </TableRowColumn>
      </TableRow>
    ))
  }


  mobileRow = (donations) => {
    return _.map(donations, (donation, donation_idx) => (
      <div className={styles['mobile-table-row']} key={donation.id}>
        <div className={styles['mobile-table-col']}>
          <span className={styles['mobile-table-label']}>Solicitante</span>
          <span className={styles['mobile-table-value']}>{donation.name || '-'}</span>
        </div>
        <div className={styles['mobile-table-col']}>
          <span className={styles['mobile-table-label']}>Tipo de sangre</span>
          <span className={styles['mobile-table-value']}>{donation.blood_type || '-'}</span>
        </div>
        <div className={styles['mobile-table-col']}>
          <span className={styles['mobile-table-label']}>Donantes requeridos</span>
          <span className={styles['mobile-table-value']}>{donation.size || '-'}</span>
        </div>
        <div className={styles['mobile-table-col']}>
          {donation.description || '-'}
        </div>
        <div className={styles['mobile-table-col']}>
          {donation.user_id === auth.user().id &&
          <RaisedButton fullWidth label="Borrar" secondary={true} onClick={this.handleDelete.bind(this, donation)} />
          }
        </div>
      </div>
    ))
  }

  render () {
    return (
      <div className={cx('container', styles.dashboard)}>
        <header>
          <h3><AddLocationIcon color="#AD1457" /> Nueva solicitud</h3>
        </header>

        <p>
          En el siguiente formulario usted puede crear una nueva solicitud de donación de sangre. Simplemente rellene los campos y presione 'Agregar'.
        </p>

        <div className={'row'}>

          <div className={'col-4'}>
            <TextField
              hintText="Nombre del solicitante"
              fullWidth={true}
              errorText={this.state.name_message}
              value={this.state.name}
              onChange={this.handleChangeName}
            />
          </div>

          <div className={'col-4'}>
            <SelectField
              hintText="Tipo de sangre"
              fullWidth={true}
              errorText={this.state.type_message}
              value={this.state.type}
              onChange={this.handleChangeBloodType}
            >
              <MenuItem value={'O-'} primaryText="O-" />
              <MenuItem value={'O+'} primaryText="O+" />
              <MenuItem value={'A-'} primaryText="A-" />
              <MenuItem value={'A+'} primaryText="A+" />
              <MenuItem value={'B-'} primaryText="B-" />
              <MenuItem value={'B+'} primaryText="B+" />
              <MenuItem value={'AB-'} primaryText="AB-" />
              <MenuItem value={'AB+'} primaryText="AB+" />
            </SelectField>
          </div>

          <div className={'col-4'}>
            <TextField
              hintText="Donantes requeridos"
              type="number"
              fullWidth={true}
              errorText={this.state.size_message}
              value={this.state.size}
              min={1}
              onChange={this.handleChangeSize}
            />
          </div>

          <div className={'col-12'}>
            <TextField
              type='text'
              hintText="Description"
              multiLine={true}
              fullWidth={true}
              value={this.state.description}
              onChange={this.handleChangeDescription}
            />
          </div>

          <div className={'col-12'}>
            <p className={!this.state.posEsNull && styles.error || null}>Determine el lugar del evento en el mapa </p>
          </div>
        </div>

        <div className={'row'}>
          <div className={'col-12'}>
            <RaisedButton
              label="Agregar"
              primary={true}
              className={styles.submit}
              onClick={(event) => this.handleClick(event)}
            />
          </div>
        </div>

        <header>
          <h3><ListIcon color="#AD1457" /> Solicitudes actuales</h3>
          <div className={styles.right}>
            <Toggle
              style={{ width: 200 }}
              label="Solo mias"
              onToggle={this.handleToggleOnlyMine}
            />
          </div>
        </header>

        {this.props.donations.length ?
        <div>
          <div className={styles['table-wrapper']}>
            <Table selectable={false}>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn>Solicitante</TableHeaderColumn>
                  <TableHeaderColumn>Tipo de sangre</TableHeaderColumn>
                  <TableHeaderColumn>Donantes requeridos</TableHeaderColumn>
                  <TableHeaderColumn colSpan={3}>Descripcion</TableHeaderColumn>
                  <TableHeaderColumn>Borrar</TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={false}>
                {this.row(this.props.donations)}
              </TableBody>
            </Table>
          </div>

          {/* Inspirado en https://codepen.io/AllThingsSmitty/pen/MyqmdM */}
          <div className={styles['mobile-table']}>
            {this.mobileRow(this.props.donations)}
          </div>
        </div>
        :
        <NoData message={this.state.message_warning}/>
        }

        <header>
          <h3><MapIcon color="#AD1457" /> Mapa de solicitudes</h3>
        </header>

        <div className={'clearfix'}>
          <div className={styles.filters}>
            <span className={styles.label}>
              Filtros:
            </span>

            <SelectField
              hintText="Tipo de sangre"
              fullWidth={true}
              style={{ minWidth: 150, marginRight: 15 }}
              value={this.state.blood_type_filter}
              onChange={this.handleBloodTypeFilter}
            >
              <MenuItem value={"O%2D"} primaryText="O-" />
              <MenuItem value={"O%2B"} primaryText="O+" />
              <MenuItem value={"A%2D"} primaryText="A-" />
              <MenuItem value={"A%2B"} primaryText="A+" />
              <MenuItem value={"B%2D"} primaryText="B-" />
              <MenuItem value={"B%2B"} primaryText="B+" />
              <MenuItem value={"AB%2D"} primaryText="AB-" />
              <MenuItem value={"AB%2B"} primaryText="AB+" />
            </SelectField>

            <RaisedButton
              label="Filtrar"
              primary={true}
              className={styles.submit}
              onClick={(event) => this.handleFilter(event)}
            />
          </div>
        </div>
        {this.state.posLat && this.state.posLng &&
          <div className={styles['map-wrapper']}>
            <Map
              style={{ width: '100%'}}
              google={this.props.google}
              onClick={this.onMapClicked}
              defaultCenter={{ lat: this.state.posLat, lng: this.state.posLng }}
              initialCenter={{
                lat: this.state.posLat,
                lng:this.state.posLng
              }}
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
                          <h4>{donation.name || '-'}</h4>
                          <p>{donation.blood_type || '-'}</p>
                        </div>
                    </InfoWindow>]
                })
              }
              { this.state.lat && this.state.lng &&
                <Marker
                  name={'Posicion actual'}
                  position={{lat: this.state.lat, lng: this.state.lng}}
                />
              }
            </Map>
          </div>
          }
      </div>
    )
  }
}

Dashboard = GoogleApiWrapper({
  apiKey: 'AIzaSyDKp8YVeKkJsSnDncTBVICRfzGNAuob8Rs'
})(Dashboard)

function mapStateToProps (state) {
  return {
    donations: state.donations.donations,
  }
}
function mapDispatchToProps (dispatch) {
  return {
    fetchData: bindActionCreators(fetchDonations, dispatch),
    createDonationEvent: bindActionCreators(createDonationEvent, dispatch),
    deleteDonationEvent: bindActionCreators(deleteDonationEvent, dispatch),
    fetchMyDonations: bindActionCreators(fetchMyDonations, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
