import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el nuevo paquete

// Definición del esquema de validación con Yup
const schema = yup.object().shape({
  username: yup.string().required('Nombre de usuario es requerido'),
  email: yup.string().email('Email no válido').required('Email es requerido'),
  password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Contraseña es requerida'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmación de contraseña es requerida'),
  birthDay: yup.string().required('El día es requerido'),
  birthMonth: yup.string().required('El mes es requerido'),
  birthYear: yup.string().required('El año es requerido'),
  country: yup.string().required('El país de residencia es requerido'),
});

const MyForm = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  // Cargar lista de países desde la API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryNames = response.data.map((country) => country.name.common);
        setCountries(countryNames);
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la lista de países');
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Generar días, meses y años para los selectores
  useEffect(() => {
    // Generar los días (1-31)
    const daysArray = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    setDays(daysArray);

    // Generar los meses (1-12)
    const monthsArray = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    setMonths(monthsArray);

    // Generar años (desde el año actual hasta 100 años atrás)
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from(
      { length: 100 },
      (_, i) => (currentYear - i).toString()
    );
    setYears(yearsArray);
  }, []);

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        country: '',
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        // Crear fecha completa
        const birthDate = `${values.birthDay}-${values.birthMonth}-${values.birthYear}`;
        // Mostrar mensaje de éxito y redirigir a la siguiente pantalla
        Alert.alert('Registro Exitoso', `Bienvenido, ${values.username}! Fecha de nacimiento: ${birthDate}`);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
        
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Nombre completo"
            />
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Correo electrónico"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Contraseña"
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Confirmar contraseña"
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

            {/* Fecha de nacimiento con tres Pickers */}
            <Text style={styles.label}>{'\n'}Introduzca la fecha {'\n'}</Text>
            <View style={styles.dateContainer}>
              <View style={[styles.pickerContainer, styles.datePickerBorder]}>
                <Picker
                  selectedValue={values.birthDay}
                  onValueChange={handleChange('birthDay')}
                  onBlur={() => setFieldTouched('birthDay', true)}
                >
                  <Picker.Item label="Dia" />
                  {days.map((day) => (
                    <Picker.Item key={day} label={day} value={day} />
                  ))}
                </Picker>
              </View>

              <View style={[styles.pickerContainer, styles.datePickerBorder]}>
                <Picker
                  selectedValue={values.birthMonth}
                  onValueChange={handleChange('birthMonth')}
                  onBlur={() => setFieldTouched('birthMonth', true)}
                >
                  <Picker.Item label="Mes" />
                  {months.map((month) => (
                    <Picker.Item key={month} label={month} value={month} />
                  ))}
                </Picker>
              </View>

              <View style={[styles.pickerContainer, styles.datePickerBorder]}>
                <Picker
                  selectedValue={values.birthYear}
                  onValueChange={handleChange('birthYear')}
                  onBlur={() => setFieldTouched('birthYear', true)}
                >
                  <Picker.Item label="Año" />
                  {years.map((year) => (
                    <Picker.Item key={year} label={year} value={year} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Errores de fecha agrupados */}
            {(touched.birthDay && errors.birthDay) || (touched.birthMonth && errors.birthMonth) || (touched.birthYear && errors.birthYear) ? (
              <Text style={styles.error}>
                {errors.birthDay}
                {'\n'}
                {errors.birthMonth}
                {'\n'}
                {errors.birthYear}
              </Text>
            ) : null}

            {/* País de residencia */}
            <Text style={styles.label}>{'\n'}País de residencia{'\n'}</Text>
            <View style={[styles.pickerContainer2, styles.datePickerBorder]}>
              {loading ? (
                <Text>Cargando países...</Text>
              ) : (
                <Picker
                  selectedValue={values.country}
                  onValueChange={handleChange('country')}
                  onBlur={() => setFieldTouched('country', true)}
                >
                  <Picker.Item label="Selecciona tu país" value="" />
                  {countries.map((country, index) => (
                    <Picker.Item key={index} label={country} value={country} />
                  ))}
                </Picker>
              )}
            </View>
            {touched.country && errors.country && <Text style={styles.error}>{errors.country} </Text>}

            {/* Botón personalizado */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 20,
    paddingBottom: 40,
    paddingTop: 40,
    borderWidth: 2,
    borderColor: '#ccc',
    
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 10,
    width: '32%',
  },
  datePickerBorder: {
    borderWidth: 1,
    borderColor: '#ccc', // Establecer el borde de los pickers
    borderRadius: 5,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#fec900', // Color naranja
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyForm;
