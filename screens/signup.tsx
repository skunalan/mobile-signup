import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import MapSheet from 'components/map-sheet';

const SignupScreen = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      phoneNumber: '',
      profile_image: '',
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ['images'],
    });

    const uri = result.assets?.[0]?.uri;
    if (!uri) {
      return;
    }
    setValue('profile_image', uri);
  };

  const { profile_image, coordinate } = watch();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View className="flex-1 gap-3 bg-slate-50 p-6">
      <Image
        className="mx-auto h-[100px] w-[100px] rounded-xl"
        source={require(`../assets/images/Logo.jpg`)}
      />

      <View className="mt-2 flex-row gap-3">
      <TouchableOpacity
  onPress={selectImage}
  className="aspect-square w-[100px] flex-row items-center justify-center overflow-hidden rounded-full bg-gray-200">
  {profile_image ? (
    <Image className="aspect-square w-[100px]" source={{ uri: profile_image }} />
  ) : (
    <View className="items-center justify-center">
      <Text className="text-xs text-gray-500">Add Photo</Text>
    </View>
  )}
</TouchableOpacity>
        <View className="flex-1 gap-3">
          {/* Name field */}
          <View className="gap-1">
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  className="h-14 rounded-full border-2 border-gray-300 px-5"
                  placeholder="Name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
          </View>

          {/* Surname field */}
          <View className="gap-1">
            <Controller
              name="surname"
              control={control}
              rules={{ required: 'Surname is required' }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  className="h-14 rounded-full border-2 border-gray-300 px-5"
                  placeholder="Surname"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.surname && <Text className="text-red-500">{errors.surname.message}</Text>}
          </View>
        </View>
      </View>

      <View className="mt-3 gap-3">
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Email is invalid' },
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              className="h-14 rounded-full border-2 border-gray-300 px-5"
              placeholder="E-Mail"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Password is too short' },
          }}
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
        {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: 'Phone number is required',
            pattern: { value: /^\d{10}$/, message: 'Phone number is invalid' },
          }}
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
              mask={'(999)999 99 99'}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.phoneNumber && <Text className="text-red-500">{errors.phoneNumber.message}</Text>}
      </View>
      <Controller
        name="coordinate"
        control={control}
        rules={{
          required: 'Coordinate is required',
          validate: (value) =>
            (value.latitude !== 0 && value.longitude !== 0) || 'Coordinate is invalid',
        }}
        defaultValue={{ latitude: 0, longitude: 0 }}
        render={({ field: { value, onChange } }) => (
          <>
            <View>
              <Text>latitude: {value.latitude}</Text>
              <Text>longitude: {value.longitude}</Text>
            </View>
            {errors.coordinate && <Text className="text-red-500">{errors.coordinate.message}</Text>}
            <MapSheet
              onMapPress={(coordinate) => {
                onChange(coordinate);
              }}
            />
          </>
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} title="Submit" />
    </View>
  );
};

export default SignupScreen;
