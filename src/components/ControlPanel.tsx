import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Producto {
  id: number;
  titulo: string;
  precio: number;
  stock: number;
  talles: string[];
  imagen: string;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ControlPanel = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [talles, setTalles] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalProductos, setTotalProductos] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const preset_name = "prueba01";
  const cloud_name = "dtjdgkvgq";

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    fetchProductos(page, rowsPerPage);
  }, [page, rowsPerPage]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const checkAdmin = async () => {
    try {
      const token = localStorage.getItem('token'); // Asume que el token se guarda en localStorage
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      //TODO SEPARAR LA COMPROBACION DE CUANDO INICIA SESION Y APARTE DE CHEQUEAR SI ES ADMIN

      const response = await axios.get('https://proyecto-tienda01backend-production.up.railway.app/api/auth/Panel-Administrador', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('el usuario es admin', response.data);


      if (response.data.user.roles.includes("admin")) {

        setIsAdmin(true);
        setIsLoggedIn(true);
        fetchProductos(page, rowsPerPage);
      } else {
        setIsLoggedIn(true);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error al verificar el rol del usuario:', error);
      setIsLoggedIn(false);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const fetchProductos = async (page: number, rowsPerPage: number) => {
    try {
      const response = await axios.get('https://proyecto-tienda01backend-production.up.railway.app/api/productos', {
        params: {
          limit: rowsPerPage,
          offset: page * rowsPerPage,
        },
      });
      setProductos(response.data);
      setTotalProductos(response.data.length); // Asume que la API devuelve el total de productos en la respuesta
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const handleAddOrUpdateProducto = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const product = {
      titulo: titulo,
      precio: Number.parseFloat(precio),
      stock: Number.parseFloat(stock),
      talles: [talles],
      imagenes: [imagen],

    }
    try {
      const token = localStorage.getItem('token');
      if (editId) {
        await axios.patch(`https://proyecto-tienda01backend-production.up.railway.app/api/productos/${editId}`, JSON.stringify(product), {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setEditId(null);
      } else {
        await axios.post('https://proyecto-tienda01backend-production.up.railway.app/api/productos', JSON.stringify(product), {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
      fetchProductos(page, rowsPerPage);
      setTitulo('');
      setPrecio('');
      setStock('');
      setTalles('');
      setImagen(null);
    } catch (error) {
      console.error('Error al agregar o actualizar el producto:', error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const handleEditProducto = (producto: Producto) => {
    setEditId(producto.id);
    setTitulo(producto.titulo);
    setPrecio(producto.precio.toString());
    setStock(producto.stock.toString());
    setTalles(producto.talles.join(', '));
    setImagen(null); // No se puede previsualizar la imagen existente
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleDeleteProducto = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://proyecto-tienda01backend-production.up.railway.app/api/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProductos(page, rowsPerPage);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', preset_name);

    setLoading(true);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const file = await response.json();
      setImagen(file.secure_url as string);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!isLoggedIn) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel de Control
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button variant="contained" color="primary" component={RouterLink} to="/login">
            Iniciar Sesión
          </Button>
          <Button variant="contained" color="secondary" component={RouterLink} to="/register">
            Registrarse
          </Button>
        </Box>
      </Container>
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (isLoggedIn && !isAdmin) {
    return (
      <Container>
        <Typography variant="h6">No tienes permiso para acceder a esta página.</Typography>
        <Button variant="contained" color="primary" onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}>
          Iniciar sesión con otra cuenta
        </Button>
      </Container>
    );
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Container className='p-6 m-8 bg-gray-300'>
      <Typography variant="h4" component="h1" gutterBottom className='text-black'>
        Panel de Control
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mb: 2 }}>
        Cerrar Sesión
      </Button>
      <Box component="form" onSubmit={handleAddOrUpdateProducto} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <TextField
          color="secondary"
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <TextField
          color="secondary"
          label="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          type="number"
        />
        <TextField
          color="secondary"
          label="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          type="number"
        />
        <TextField
          color="secondary"
          label="Talles (separados por comas)"
          value={talles}
          onChange={(e) => setTalles(e.target.value)}
          required
        />
        <Button
          variant="contained"
          component="label"
        >
          Subir Imagen
          <input
            type="file"
            hidden
            onChange={uploadImage}
          />
        </Button>
        {loading ? (
          <Typography variant="body2">Cargando imagen...</Typography>
        ) : (
          imagen && <img src={imagen} alt="Imagen del producto" width="100" />
        )}
        <Button type="submit" variant="contained" color="primary">
          {editId ? 'Actualizar Producto' : 'Agregar Producto'}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow >
              <TableCell >Título</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Talles</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.titulo}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>{producto.talles.join(', ')}</TableCell>
                <TableCell>
                  {producto.imagen && <img src={producto.imagen} alt={producto.titulo} width="50" />}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditProducto(producto)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProducto(producto.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalProductos}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

    </Container>
  );
};


//TODO arreglar tema de paginacion y funcionamiento de las imagenes 