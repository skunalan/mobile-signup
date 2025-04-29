import { View, Text, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';

const SignupScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  });
  return (
    <View className="p-6 gap-3">
      <View className='flex-row gap-2'>
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            className="h-14 rounded-full border-2 border-gray-300 px-5 flex-1"
            placeholder="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        name="surname"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            className="h-14 rounded-full border-2 border-gray-300 px-5 flex-1"
            placeholder="Surname"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      </View>
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            className="h-14 rounded-full border-2 border-gray-300 px-5"
            placeholder="E-Mail"
            value={value}
            onChangeText={onChange}
          />
          
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            className="h-14 rounded-full border-2 border-gray-300 px-5"
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
          
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { value, onChange } }) => (
          <MaskedTextInput
            style={{
              height: 51,
              borderRadius: 9999,
              borderWidth: 2,
              borderColor: '#D1D5DB',
              paddingHorizontal: 20,
            }}
            placeholder="Phone"
            mask={"(999)999 99 99"}
            value={value}
            onChangeText={onChange}
          />
          
        )}
      />

    </View>
  );
};

export default SignupScreen;
