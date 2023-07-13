import {
    Typography,
    Box,
    List,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    ListItemButton,
    ListItemText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useIntl } from '../../translate/useTranslate';
import { NavLink } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { Menu } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import flagBrazil from '../../images/flags/brazil.png';
import flagUSA from '../../images/flags/eua.png';
import { changeLanguageRequest } from '../../redux/translate/actions';
import { useDispatch } from 'react-redux';

interface HeaderProps {
    setLanguage: (language: 'pt' | 'en') => void;
    language: 'pt' | 'en';
}

export function Header({ setLanguage, language }: HeaderProps) {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeLanguageRequest(language));
    }, [language, dispatch]);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    function handleChangeLanguage(event: SelectChangeEvent<'pt' | 'en'>) {
        const selectedLanguage = event.target.value as string;

        if (selectedLanguage === 'pt' || selectedLanguage === 'en') {
            setLanguage(selectedLanguage);
        }
    }

    const menuItems = useMemo(
        () => [
            {
                path: '/',
                label: formatMessage({ id: 'headerNavigationProduct' }),
            },
            {
                path: '/brand',
                label: formatMessage({ id: 'headerNavigationBrand' }),
            },
        ],
        [formatMessage],
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                    >
                        <Menu fontSize="large" />
                    </IconButton>

                    <Typography
                        variant="h4"
                        sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            paddingLeft: '4rem',
                        }}
                    >
                        {formatMessage({ id: 'headerTitle' })}
                    </Typography>

                    <FormControl color="info" sx={{ marginY: '0.7rem' }}>
                        <InputLabel sx={{ color: grey[50] }}>
                            {formatMessage({ id: 'selectLanguageTitle' })}
                        </InputLabel>

                        <Select
                            value={language}
                            label="linguagem"
                            color="info"
                            onChange={handleChangeLanguage}
                            sx={{ color: grey[50] }}
                        >
                            <MenuItem value={'pt'}>
                                {formatMessage({ id: 'selectLanguagePtBr' }) +
                                    ' '}
                                <img
                                    style={{ borderRadius: 1 }}
                                    src={flagBrazil}
                                    width={'20rem'}
                                />
                            </MenuItem>

                            <MenuItem value={'en'}>
                                {formatMessage({ id: 'selectLanguageEnUSA' }) +
                                    ' '}
                                <img
                                    src={flagUSA}
                                    style={{ borderRadius: 1 }}
                                    width={'20rem'}
                                />
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <List
                    sx={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                    }}
                >
                    {menuItems.map((item) => (
                        <ListItemButton
                            content="button"
                            color="primary"
                            component={NavLink}
                            to={item.path}
                            key={item.label}
                            onClick={toggleDrawer}
                            divider={true}
                        >
                            <ListItemText
                                primaryTypographyProps={{
                                    style: { fontSize: '1.5rem' },
                                }}
                                primary={item.label}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
