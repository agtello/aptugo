import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import Checkbox from '@mui/material/Checkbox'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import stylesusmodulescss from 'dist/css/stylesus.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import AddDialog from '../components/Dialog/Dialog'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import { addSuscripciones, editSuscripciones, loadSuscripciones, removeSuscripcion, searchSuscripciones } from '../store/actions/suscripcionesActions'
import { ISuscripcionesItem } from '../store/models'
import { IState } from '../store/reducers/index'
export { RadioButtonUncheckedIcon }

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Suscripciones: FunctionComponent = (props: any) => {
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
  const suscripcionesData = useSelector((state: IState) => state.suscripciones)
  const [lang, setlang] = React.useState<any>('en')
  const theme = stylesusmodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForSuscripciones = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchSuscripciones(options) : loadSuscripciones(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogSuscripcionesAction, setdialogSuscripcionesAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchSuscripciones(options) : loadSuscripciones(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.pages}>
          <div title="div" className={theme.mainarea}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">suscripcion list</Typography>
              </div>

              <Paper square>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search suscripcion..."
                      margin="dense"
                      size="small"
                      className={theme.extensibleInput}
                      type="text"
                      onChange={searchForSuscripciones}
                    />

                    <LocalAddDialog
                      isOpen={dialogSuscripcionesAction !== ''}
                      onOpen={() => setdialogSuscripcionesAction('add')}
                      onSave={() => setdialogSuscripcionesAction('')}
                      onClose={() => setdialogSuscripcionesAction('')}
                      action={dialogSuscripcionesAction}
                      addOptions={{ title: 'Add suscripcion', text: 'Enter suscripcion data', button: 'Add' }}
                      editOptions={{ title: 'Edit suscripcion', text: 'Update suscripcion data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: ISuscripcionesItem) => {
                        if (dialogSuscripcionesAction === 'delete') {
                          dispatch(removeSuscripcion(data))
                        } else {
                          dialogSuscripcionesAction === 'add' ? dispatch(addSuscripciones(data)) : dispatch(editSuscripciones(data))
                        }
                      }}
                      color="primary"
                      data={Suscripcionesdata}
                      initialData={initialDataSuscripciones}
                      setData={setSuscripcionesData}
                      allowMultipleSubmit={dialogSuscripcionesAction === 'add'}
                    >
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
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Nombre Contacto', 'Email', 'Telefono', 'Rubro', 'Posee Software', 'Actions']}
                      tableData={
                        suscripcionesData.foundsuscripciones.length ? suscripcionesData.foundsuscripciones : (suscripcionesData.suscripciones as any)
                      }
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.Contacto} />

                      <Field value={(fieldData: any) => fieldData.Email} />

                      <Field value={(fieldData: any) => fieldData.Telefono} />

                      <Field value={(fieldData: any) => fieldData.Rubro} />

                      <Field
                        value={(fieldData: any) =>
                          fieldData.PoseesoftwaredeGestionDocumental ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />
                        }
                      />

                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setSuscripcionesData(e.element)
                            setdialogSuscripcionesAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setSuscripcionesData(e.element)
                            setdialogSuscripcionesAction('delete')
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Suscripciones
