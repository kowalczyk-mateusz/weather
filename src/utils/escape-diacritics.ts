const map: { [key: string]: string } = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
  Ą: 'A',
  Ć: 'C',
  Ę: 'E',
  Ł: 'L',
  Ń: 'N',
  Ó: 'O',
  Ś: 'S',
  Ź: 'Z',
  Ż: 'Z',
};

export const escapeDiacritics = (str: string): string => {
  const decodeString = decodeURIComponent(str);

  return decodeString.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (match) => map[match]);
};
