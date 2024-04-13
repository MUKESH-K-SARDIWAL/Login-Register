import { Image, StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableOpacity, } from 'react-native'
import React, { useCallback } from 'react'
import { Formik } from 'formik';
import CustomTextInput from '../Common/CustomTextInput';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const { width } = Dimensions.get('screen');

    const loginSchema = Yup.object().shape({
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Password is Required'),
        email: Yup.string().email('Invalid email').required('Email is Required'),
    });

    const navigation = useNavigation();

    const goToSignUpPage = useCallback(() => {
        navigation.navigate('SignUp')
    }, [])

    return (
        <View style={styles.container}>

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => console.log(values)}
                validationSchema={loginSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isValidating }) => (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: '#000', marginVertical: 20 }}>Login Form</Text>
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
                        <TouchableOpacity onPress={goToSignUpPage} style={{marginTop:20}}>
                            <Text style={{ textAlign: 'center', fontSize: 14, color: '#000' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default Login

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