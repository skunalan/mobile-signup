import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import MapSheet from 'components/map-sheet';

const SignupScreen = () => {
  const { control, handleSubmit, setValue, watch } = useForm({
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
      }
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
    <View className="gap-3 p-6 flex-1">
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={selectImage}
          className="aspect-square w-[100px] flex-row overflow-hidden rounded-full bg-gray-200">
          <Image className="aspect-square w-[100px]" source={{ uri: profile_image }} />
        </TouchableOpacity>
        <View className="flex-1 gap-3">
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                className="h-14 flex-1 rounded-full border-2 border-gray-300 px-5"
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
                className="h-14 flex-1 rounded-full border-2 border-gray-300 px-5"
                placeholder="Surname"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>

      <View className="mt-3 gap-3">
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
              mask={'(999)999 99 99'}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <View>
        <Text>latitude: {coordinate?.latitude}</Text>
        <Text>longitude: {coordinate?.longitude}</Text>
      </View>
      <Button onPress={handleSubmit(onSubmit)} title='Submit'/>
      <MapSheet onMapPress={(coordinate)=> {setValue('coordinate', coordinate)}}/>
    </View>
  );
};

export default SignupScreen;
