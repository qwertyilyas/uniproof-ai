/**
 * UNIPROOF AI - create a real feedback Google Form + linked response spreadsheet.
 * Run createUniproofFeedbackForm() once from https://script.google.com
 */
function createUniproofFeedbackForm() {
  const form = FormApp.create('UNIPROOF AI — отзыв о прототипе');
  form.setDescription(
    'Помогите оценить учебный MVP UNIPROOF AI. Не указывайте паспортные, финансовые или иные чувствительные данные.'
  );
  form.setConfirmationMessage('Спасибо! Ваш отзыв сохранён и поможет улучшить UNIPROOF AI.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);

  form.addScaleItem()
    .setTitle('Насколько понятна идея платформы?')
    .setBounds(1, 5)
    .setLabels('Совсем непонятна', 'Полностью понятна')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Удобно ли находить нужные разделы сайта?')
    .setChoiceValues(['Да', 'Частично', 'Нет'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Какой модуль кажется наиболее полезным?')
    .setChoiceValues(['Document Verify', 'Skill Verify', 'Оба модуля', 'Пока не определился(ась)'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Для кого, по вашему мнению, платформа наиболее полезна?')
    .setChoiceValues(['Студенты и выпускники', 'Университеты', 'Работодатели', 'Учебные центры'])
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Оцените общее впечатление от прототипа')
    .setBounds(1, 5)
    .setLabels('Низкое', 'Отличное')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Что стоит улучшить?')
    .setRequired(false);

  const spreadsheet = SpreadsheetApp.create('UNIPROOF AI — отзывы пользователей');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  Logger.log('FORM_PUBLIC_URL=' + form.getPublishedUrl());
  Logger.log('FORM_EDIT_URL=' + form.getEditUrl());
  Logger.log('SHEET_URL=' + spreadsheet.getUrl());
}
