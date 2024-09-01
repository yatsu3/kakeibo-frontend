import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

type FormValues = {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  prefecture: string;
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


const UserRegistration: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const [gender, setGender] = useState<string>('');
    const [prefecture, setPrefecture] = useState<string>('');

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await fetch('/register-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
                mode: "cors",
                credentials: "include",
      
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }



            console.log('User registered successfully:');
            // 登録成功後の処理
        } catch (error) {
            console.error('Error registering user:', error);
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
                    ユーザー登録
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        label="ユーザー名"
                        {...register('name', { required: 'ユーザー名が入力されてません' })}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
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
                        <InputLabel id="prefecture-label">住所</InputLabel>
                        <Select
                            labelId="prefecture-label"
                            id="prefecture"
                            label="住所"
                            value={prefecture}
                            {...register('prefecture', { required: '住所が選択されていません' })}
                            error={!!errors.prefecture}
                            onChange={(e) => setPrefecture(e.target.value)}
                        >
                            {prefectures.map(prefecture => (
                                <MenuItem key={prefecture} value={prefecture}>
                                    {prefecture}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.prefecture && <Typography color="error">{errors.prefecture.message}</Typography>}
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="メールアドレス"
                        type="email"
                        {...register('email', {
                            required: 'メールアドレスが入力されていません',
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: 'メールアドレスの形式が誤っています'
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="password"
                        label="パスワード"
                        type="password"
                        {...register('password', {
                            required: 'パスワードが入力されていません',
                            minLength: {
                                value: 10,
                                message: 'パスワードは少なくとも10文字以上入力してください'
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        登録
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default UserRegistration;
