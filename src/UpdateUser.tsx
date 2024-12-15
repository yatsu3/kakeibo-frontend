import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getAuth } from "firebase/auth";

type FormValues = {
  userName: string;
  age: number;
  gender: string;
  address: string;
};

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

const UpdateUser: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
  const [gender, setGender] = useState<string>('');
  const [address, setPrefecture] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => { (async() => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
          try {
            const response = await fetch('/get-user', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "UserId": `${userId}`,
              },
              mode: "cors",
              credentials: "include",
            });
            const data = await response.json();
            setGender(data.gender);
            setPrefecture(data.address);
            setUserName(data.userName);
            setAge(data.age);
    
            // フォームにデータを設定
            setValue('userName', data.userName);
            setValue('age', data.age);
            setValue('gender', data.gender);
            setValue('address', data.address);
    
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
  }) ()
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      const response = await fetch('/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
          "UserId": `${userId}`,
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert("ユーザー登録完了しました。");
      setGender("");
      setPrefecture("");
      // 登録成功後の処理
    } catch (error) {
      console.error('Error registering user:', error);
      alert("ユーザーはすでに入力したメールアドレスで登録されています。")
      // エラーハンドリング
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          ユーザー情報
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="userName"
            label="ユーザー名"
            {...register('userName', { required: 'ユーザー名が入力されてません' })}
            error={!!errors.userName}
            helperText={errors.userName ? errors.userName.message : ''}
            InputLabelProps={{
                shrink: true,  // 入力フィールドに値がなくてもラベルが上に固定される
              }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="age"
            label="年齢"
            type="number"
            {...register('age', {
              required: '年齢が入力されていません',
              min: {
                value: 0,
                message: 'Age must be a positive number'
              },
              max: {
                value: 120,
                message: 'Age must be less than or equal to 120'
              }
            })}
            error={!!errors.age}
            helperText={errors.age ? errors.age.message : ''}
            InputLabelProps={{
                shrink: true,  // 入力フィールドに値がなくてもラベルが上に固定される
              }}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="gender-label">性別</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              label="性別"
              value={gender}
              {...register('gender', { required: '性別が選択されていません' })}
              error={!!errors.gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="男性">男性</MenuItem>
              <MenuItem value="女性">女性</MenuItem>
            </Select>
            {errors.gender && <Typography color="error">{errors.gender.message}</Typography>}
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="address-label">住所</InputLabel>
            <Select
              labelId="address-label"
              id="address"
              label="住所"
              value={address}
              {...register('address', { required: '住所が選択されていません' })}
              error={!!errors.address}
              onChange={(e) => setPrefecture(e.target.value)}
            >
              {prefectures.map(address => (
                <MenuItem key={address} value={address}>
                  {address}
                </MenuItem>
              ))}
            </Select>
            {errors.address && <Typography color="error">{errors.address.message}</Typography>}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            更新
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateUser;
