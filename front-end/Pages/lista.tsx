import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import Container from '@mui/material/Container'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import stylesusmodulescss from 'dist/css/stylesus.module.scss'

const Lista: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('en')
  const theme = stylesusmodulescss

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

          {sus.map((currentClients, index) => {
            return (
              <React.Fragment key={index}>
                <ListItem>Contacto:{currentClients.Contacto}</ListItem>
              </React.Fragment>
            )
          })}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Lista
