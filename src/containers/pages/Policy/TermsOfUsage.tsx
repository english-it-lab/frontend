
import { Box, Paper, Typography, List, ListItem, Button } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

type TermsPageProps = {
  setTerms: Dispatch<SetStateAction<boolean>> | null;
};

const TermsOfUsagePage = ({setTerms}: TermsPageProps) => {
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
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700, textAlign: 'center', color: '#000000' }}>
          Условия использования
        </Typography>

        <Box component="section" sx={{ mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600, color: '#000000' }}>
            1. Общие положения
          </Typography>
          <Typography variant="body1" sx={{ color: '#000000' }}>
            Настоящие условия регулируют использование данного веб-ресурса. Регистрируясь или начиная пользоваться сервисом, вы автоматически принимаете все указанные положения.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600, color: '#000000' }}>
            2. Правила использования
          </Typography>
          <List disablePadding sx={{ pl: 0 }}>
            {[
              'Сервис предоставляется на условиях «как есть» (as is)',
              'Запрещается использовать ресурс для распространения вредоносного ПО, спама или незаконного контента',
              'Администрация вправе ограничить доступ при нарушении правил или подозрении на мошенничество'
            ].map((text, i) => (
              <ListItem key={i} disablePadding sx={{ mb: 0.75, '&::before': { content: '"•"', color: '#000', fontWeight: 'bold', mr: 1.5, fontSize: '1.2rem' } }}>
                <Typography variant="body1" sx={{ color: '#000000' }}>{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box component="section" sx={{ mb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600, color: '#000000' }}>
            3. Ответственность
          </Typography>
          <List disablePadding sx={{ pl: 0 }}>
            {[
              'Администрация не несет ответственности за временные недоступности сервиса или потерю данных по независящим причинам',
              'Пользователь самостоятельно отвечает за достоверность и законность предоставленных данных',
              'Все материалы, дизайн и код сайта защищены авторским правом'
            ].map((text, i) => (
              <ListItem key={i} disablePadding sx={{ mb: 0.75, '&::before': { content: '"•"', color: '#000', fontWeight: 'bold', mr: 1.5, fontSize: '1.2rem' } }}>
                <Typography variant="body1" sx={{ color: '#000000' }}>{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box component="section">
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600, color: '#000000' }}>
            4. Изменение условий и связь
          </Typography>
          <List disablePadding sx={{ pl: 0 }}>
            {[
              'Администрация оставляет за собой право изменять условия без предварительного уведомления',
              'Новая версия условий вступает в силу с момента публикации на сайте',
              'По всем вопросам обращайтесь: support@example.com'
            ].map((text, i) => (
              <ListItem key={i} disablePadding sx={{ mb: 0.75, '&::before': { content: '"•"', color: '#000', fontWeight: 'bold', mr: 1.5, fontSize: '1.2rem' } }}>
                <Typography variant="body1" sx={{ color: '#000000' }}>{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
        {setTerms != null && <Button onClick={() => {setTerms(false)}}>Назад</Button>}
      </Paper>
    </Box>
  );
}

export default TermsOfUsagePage;