import { Image, StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableOpacity, Alert, } from 'react-native'
import React, { useCallback } from 'react'
import { Formik } from 'formik';
import CustomTextInput from '../Common/CustomTextInput';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const SignUp = () => {
    const { width } = Dimensions.get('screen');

    const loginSchema = Yup.object().shape({
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(10, 'Too Long!')
            .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain letters and numbers')
            .required('Password is required'),
        email: Yup.string().email('Invalid email').required('Email is Required'),
        name: Yup.string().required("Name is Required")
    });

    const navigation = useNavigation();

    const goToLoginPage = useCallback(() => {
        navigation.navigate('Login')
    }, []);

    const createUser = useCallback((values) => {
        axios.post('https://api.escuelajs.co/api/v1/users/', {
            "email": values.email,
            "name": values.name,
            "password": values.password,
            "avatar": "https://api.lorem.space/image/face?w=640&h=480"
        })
            .then(function (response) {
                console.log('response', response);
                Alert.alert(JSON.stringify(`id:${response.data.id} role:${response.data.role} creationAt :${response.data.creationAt}`))
            })
            .catch(function (error) {
                console.log('error', error);
                Alert.alert(JSON.stringify(error))
            });

    }, [])

    return (
        <View style={styles.container}>

            <Formik
                initialValues={{ email: '', password: '', name: '' }}
                onSubmit={values => createUser(values)}
                validationSchema={loginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isValidating }) => (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: '#000', marginVertical: 20 }}>Sign Up Form</Text>
                        </View>
                        <View style={{ marginTop: 10, width: width - 40, marginHorizontal: 'auto' }}>
                            <CustomTextInput name={'name'} handleChange={handleChange} handleBlur={handleBlur} values={values.name} placeholder={'Enter Your Name'} secure={false} />
                            {errors.name && touched.name ? (
                                <Text style={{ fontSize: 10, color: '#FF0000', marginVertical: 5 }}>{errors.name}</Text>
                            ) : null}
                        </View>
                        <View style={{ marginTop: 10, width: width - 40, marginHorizontal: 'auto' }}>
                            <CustomTextInput name={'email'} handleChange={handleChange} handleBlur={handleBlur} values={values.email} placeholder={'Enter Your Email'} secure={false} />
                            {errors.email && touched.email ? (
                                <Text style={{ fontSize: 10, color: '#FF0000', marginVertical: 5 }}>{errors.email}</Text>
                            ) : null}
                        </View>
                        <View style={{ marginTop: 10, width: width - 40, marginHorizontal: 'auto' }}>
                            <CustomTextInput name={'password'} handleChange={handleChange} handleBlur={handleBlur} values={values.password} placeholder={'Enter Your Passowrd'} secure={true} />
                            {errors.password && touched.password ? (
                                <Text style={{ fontSize: 10, color: '#FF0000', marginVertical: 5 }}>{errors.password}</Text>
                            ) : null}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button onPress={handleSubmit} title="Submit" />
                        </View>
                        <TouchableOpacity onPress={goToLoginPage} style={{ marginTop: 20 }}>
                            <Text style={{ textAlign: 'center', fontSize: 14, color: '#000' }}>Go To Login</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    logo: {
        width: 100,
        height: 100
    }
})