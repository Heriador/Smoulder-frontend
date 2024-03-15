/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import NavbarApp from './components/navbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEntorno, eliminarEntorno } from '../../store/actions/entorno';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
  faAddressBook,
  faDownload,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import EntornoPreview from './components/EntornoPreview/entornoPreview';

library.add(
  faPlus,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
  faAddressBook,
  faDownload,
  faEdit
);

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);
  const entornos = useSelector((state) => state.EntornoReducer.entornos);

  const handleDelete = (id) => {
    dispatch(eliminarEntorno(id));
  };

  useEffect(() => {
    dispatch(fetchEntorno());
  }, [dispatch, user.id]);

  return (
    <Container fluid className="p-0 d-flex flex-column position-absolute h-100">
      <NavbarApp user={user} />
      <Row className="p-4">
        <ol className="joined">
          {entornos.map((entorno) => {
            console.log(entorno.id);
            return (
              <EntornoPreview
                key={entorno.id}
                entorno={entorno}
                eliminar={handleDelete}
              />
            );
          })}
        </ol>
      </Row>
    </Container>
  );
};

export default Home;
