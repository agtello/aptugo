import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import stylesusmodulescss from 'dist/css/stylesus.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addSuscripciones, editSuscripciones, loadSuscripciones, searchSuscripciones } from '../store/actions/suscripcionesActions'
import { IState } from '../store/reducers/index'

const Dashboard: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataSuscripciones = {
    Contacto: '',
    Email: '',
    Telefono: '',
    Rubro: '',
    PoseesoftwaredeGestionDocumental: false,
  }
  const [Suscripcionesdata, setSuscripcionesData] = React.useState<any>(initialDataSuscripciones)
  const handleSuscripcionesChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setSuscripcionesData({
      ...Suscripcionesdata,
      [name]: value,
    })
  }
  const [lang, setlang] = React.useState<any>('en')
  const theme = stylesusmodulescss
  const sus = useSelector((state: IState) => state.suscripciones).suscripciones
  const suscripcionesData = useSelector((state: IState) => state.suscripciones)
  const dispatch = useDispatch()
  const [LoadfromDatabaseloadoptions, setLoadfromDatabaseloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromDatabaseload = (options) => {
    dispatch(options.searchString ? searchSuscripciones(options) : loadSuscripciones(options))
  }
  React.useEffect(() => {
    performLoadfromDatabaseload({
      ...LoadfromDatabaseloadoptions,
    })
  }, [LoadfromDatabaseloadoptions])
  const [openSnackbar, setopenSnackbar] = React.useState(false)

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  const suscribe = () => {
    let data = { ...Suscripcionesdata }
    setSuscripcionesData({ ...initialDataSuscripciones })

    if (data._id) {
      dispatch(editSuscripciones(data as any))
    } else {
      dispatch(addSuscripciones(data as any))
    }
  }

  return (
    <React.Fragment>
      <div className={(theme.pages, theme.suscripcion)}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => {
            setopenSnackbar(false)
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="success">
            <AlertTitle>Enviado!</AlertTitle>
          </Alert>
        </Snackbar>
        <div title="Info" className={theme.suscripcionInfo}>
          <div title="Info Wrapper">
            <Typography variant="h1">SERVICIO DIGITALIZACION PARA EMPRESAS</Typography>

            <Typography variant="body1">
              Gestiona en forma rápida facturas, remitos,contratos, documentos de recursos humanos o de ingenieria.
              <span> Llena el siguiente formulario y te contaremos como se hace!!</span>
            </Typography>

            <div title="Field Wrapper" className={theme.suscripcionField}>
              <TextField
                margin="dense"
                label="Contacto"
                type="text"
                fullWidth
                className={'field_Contacto'}
                variant="standard"
                value={Suscripcionesdata.Contacto || ''}
                onChange={handleSuscripcionesChange('Contacto')}
                error={suscripcionesData?.errField === 'Contacto'}
                helperText={suscripcionesData?.errField === 'Contacto' && suscripcionesData.errMessage}
              />

              <TextField
                margin="dense"
                label="Email"
                type="text"
                fullWidth
                className={'field_Email'}
                variant="standard"
                value={Suscripcionesdata.Email || ''}
                onChange={handleSuscripcionesChange('Email')}
                error={suscripcionesData?.errField === 'Email'}
                helperText={suscripcionesData?.errField === 'Email' && suscripcionesData.errMessage}
              />

              <TextField
                margin="dense"
                label="Telefono"
                className={'field_Telefono'}
                type="number"
                fullWidth
                variant="standard"
                value={Suscripcionesdata.Telefono || ''}
                onChange={handleSuscripcionesChange('Telefono')}
              />

              <TextField
                select
                margin="dense"
                label="Rubro"
                type="text"
                fullWidth
                variant="standard"
                value={Suscripcionesdata.Rubro}
                onChange={handleSuscripcionesChange('Rubro')}
              >
                <MenuItem key="Industria" value="Industria">
                  Industria
                </MenuItem>
                <MenuItem key="Agropecuario" value="Agropecuario">
                  Agropecuario
                </MenuItem>
                <MenuItem key="Comercio" value="Comercio">
                  Comercio
                </MenuItem>
                <MenuItem key="Servicio" value="Servicio">
                  Servicio
                </MenuItem>
                <MenuItem key="Construccion" value="Construccion">
                  Construccion
                </MenuItem>
                <MenuItem key="Grafica" value="Grafica">
                  Grafica
                </MenuItem>
              </TextField>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={Suscripcionesdata.PoseesoftwaredeGestionDocumental}
                    color="primary"
                    onChange={(e) => handleSuscripcionesChange('PoseesoftwaredeGestionDocumental')(e.currentTarget.checked)}
                  />
                }
                label="Posee software de Gestion Documental"
              />

              <Button
                variant="contained"
                onClickCapture={(e) => {
                  suscribe()
                  setopenSnackbar(true)
                }}
              >
                Inscribirse!
              </Button>
            </div>

            <div title="Socials" className={theme.socials}></div>
          </div>
        </div>

        <div title="img" className={theme.suscripcionImagen}></div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
