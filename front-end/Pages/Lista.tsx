import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import Container from '@mui/material/Container'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import stylesusmodulescss from 'dist/css/stylesus.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { loadSuscripciones, searchSuscripciones } from '../store/actions/suscripcionesActions'
import { IState } from '../store/reducers/index'

const ListaClientes: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('en')
  const theme = stylesusmodulescss
  const allClients = useSelector((state: IState) => state.suscripciones).suscripciones
  const suscripcionesData = useSelector((state: IState) => state.suscripciones)
  const dispatch = useDispatch()
  const [LoadfromDatabaselistaloadoptions, setLoadfromDatabaselistaloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromDatabaselistaload = (options) => {
    dispatch(options.searchString ? searchSuscripciones(options) : loadSuscripciones(options))
  }
  React.useEffect(() => {
    performLoadfromDatabaselistaload({
      ...LoadfromDatabaselistaloadoptions,
    })
  }, [LoadfromDatabaselistaloadoptions])

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <div className={classes.mainPanel}>
        <Container maxWidth="sm">
          <Typography variant="h3">Lista Clientes</Typography>

          {allClients.map((currentClients, index) => {
            return (
              <React.Fragment key={index}>
                <ListItem disableGutters={true}>
                  Contacto: {currentClients.Contacto}
                  EMail: {currentClients.Email}
                  Telefono: {currentClients.Telefono}
                  Rubro: {currentClients.Rubro}
                </ListItem>
              </React.Fragment>
            )
          })}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ListaClientes
