import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Sidebar from '../components/Sidebar/Sidebar'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import minimum from '../components/Themes/minimum.module.scss'
import { addSuscripcion, editSuscripcion, loadSuscripcion, removeSingleuntitled, searchSuscripcion } from '../store/actions/suscripcionActions'
import { ISuscripcionItem } from '../store/models'
import { IState } from '../store/reducers/index'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Suscripcion: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataSuscripcion = {
    Nombre: '',
    Contacto: '',
    Email: '',
    Telefono: '',
    Rubro: '',
  }
  const [Suscripciondata, setSuscripcionData] = React.useState<any>(initialDataSuscripcion)
  const handleSuscripcionChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setSuscripcionData({
      ...Suscripciondata,
      [name]: value,
    })
  }
  const suscripcionData = useSelector((state: IState) => state.suscripcion)
  const [lang, setlang] = React.useState<any>('en')
  const theme = minimum
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForSuscripcion = (event, field = null) => {
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
    dispatch(options.searchString ? searchSuscripcion(options) : loadSuscripcion(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogSuscripcionAction, setdialogSuscripcionAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchSuscripcion(options) : loadSuscripcion(options))
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
          <Sidebar color="Greens" open={true}>
            <NavLink exact to="/" key="TBM7KqrO">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Home</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/Suscripcion" key="N0Gqh7qa">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Suscripcion</ListItemText>
              </ListItem>
            </NavLink>
          </Sidebar>
          <div title="div" className={theme.mainarea}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Single Untitled list</Typography>
              </div>

              <Paper square>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search SingleUntitled..."
                      margin="dense"
                      size="small"
                      className={theme.extensibleInput}
                      type="text"
                      onChange={searchForSuscripcion}
                    />

                    <LocalAddDialog
                      isOpen={dialogSuscripcionAction !== ''}
                      onOpen={() => setdialogSuscripcionAction('add')}
                      onSave={() => setdialogSuscripcionAction('')}
                      onClose={() => setdialogSuscripcionAction('')}
                      action={dialogSuscripcionAction}
                      addOptions={{ title: 'Add Single Untitled ', text: 'Enter Single Untitled  data', button: 'Add' }}
                      editOptions={{ title: 'Edit Single Untitled ', text: 'Update Single Untitled  data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: ISuscripcionItem) => {
                        if (dialogSuscripcionAction === 'delete') {
                          dispatch(removeSingleuntitled(data))
                        } else {
                          dialogSuscripcionAction === 'add' ? dispatch(addSuscripcion(data)) : dispatch(editSuscripcion(data))
                        }
                      }}
                      color="primary"
                      data={Suscripciondata}
                      initialData={initialDataSuscripcion}
                      setData={setSuscripcionData}
                      allowMultipleSubmit={dialogSuscripcionAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        className={'field_Nombre'}
                        variant="standard"
                        value={Suscripciondata.Nombre || ''}
                        onChange={handleSuscripcionChange('Nombre')}
                        error={suscripcionData?.errField === 'Nombre'}
                        helperText={suscripcionData?.errField === 'Nombre' && suscripcionData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Contacto"
                        type="text"
                        fullWidth
                        className={'field_Contacto'}
                        variant="standard"
                        value={Suscripciondata.Contacto || ''}
                        onChange={handleSuscripcionChange('Contacto')}
                        error={suscripcionData?.errField === 'Contacto'}
                        helperText={suscripcionData?.errField === 'Contacto' && suscripcionData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Email"
                        type="text"
                        fullWidth
                        className={'field_Email'}
                        variant="standard"
                        value={Suscripciondata.Email || ''}
                        onChange={handleSuscripcionChange('Email')}
                        error={suscripcionData?.errField === 'Email'}
                        helperText={suscripcionData?.errField === 'Email' && suscripcionData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Telefono"
                        className={'field_Telefono'}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Suscripciondata.Telefono || ''}
                        onChange={handleSuscripcionChange('Telefono')}
                      />

                      <TextField
                        margin="dense"
                        label="Rubro"
                        type="text"
                        fullWidth
                        className={'field_Rubro'}
                        variant="standard"
                        value={Suscripciondata.Rubro || ''}
                        onChange={handleSuscripcionChange('Rubro')}
                        error={suscripcionData?.errField === 'Rubro'}
                        helperText={suscripcionData?.errField === 'Rubro' && suscripcionData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Nombre', 'Contacto', 'Email', 'Telefono', 'Rubro', 'Actions']}
                      tableData={suscripcionData.foundsuscripcion.length ? suscripcionData.foundsuscripcion : (suscripcionData.suscripcion as any)}
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
                      <Field value={(fieldData: any) => fieldData.Nombre} />

                      <Field value={(fieldData: any) => fieldData.Contacto} />

                      <Field value={(fieldData: any) => fieldData.Email} />

                      <Field value={(fieldData: any) => fieldData.Telefono} />

                      <Field value={(fieldData: any) => fieldData.Rubro} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setSuscripcionData(e.element)
                            setdialogSuscripcionAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeSingleuntitled(e.element))
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

export default Suscripcion
