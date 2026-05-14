import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';


export default function PrivacyPolicy() {
  return (
    <Box sx={{ py: 4, px: 2, minHeight: '100vh' }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          maxWidth: 820, 
          mx: 'auto', 
          borderRadius: 2, 
          bgcolor: '#ffffff' 
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700, textAlign: 'center', color: 'text.primary'}}>
          Политика конфиденциальности
        </Typography>

        <Box component="section" sx={{ mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            1. Общие положения
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            Настоящая политика составлена в соответствии с 152-ФЗ «О персональных данных».
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            2. Какие данные мы собираем
          </Typography>
          <List disablePadding sx={{ pl: 0 }}>
            {[
              'ФИО, email, телефон, название факультета, название вуза — при регистрации',
              'Технические данные: IP, User-Agent, cookie — при посещении сайта'
            ].map((text, i) => (
              <ListItem key={i} disablePadding sx={{ mb: 0.75, '&::before': { content: '"•"', color: 'text.primary', fontWeight: 'bold', mr: 1.5, fontSize: '1.2rem' } }}>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box component="section" sx={{ mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600,  color: 'text.primary' }}>
            3. Цели обработки
          </Typography>
          <List disablePadding sx={{ pl: 0 }}>
            {[
              'Обработка заявок и поддержка организации мероприятий',
              'Аналитика использования сервиса'
            ].map((text, i) => (
              <ListItem key={i} disablePadding sx={{ mb: 0.75, '&::before': { content: '"•"', color: 'text.primary', fontWeight: 'bold', mr: 1.5, fontSize: '1.2rem' } }}>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box component="section">
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600,  color: 'text.primary' }}>
            4. Ваши права
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, color: 'text.primary'}}>Вы можете:</Typography>
          <List disablePadding sx={{ pl: 0 }}>
            {[
              'Запросить копию своих данных',
              'Потребовать исправления или удаления',
              'Отозвать согласие на обработку'
            ].map((text, i) => (
              <ListItem key={i} disablePadding sx={{ mb: 0.75, '&::before': { content: '"•"',  color: 'text.primary', fontWeight: 'bold', mr: 1.5, fontSize: '1.2rem' } }}>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
}
