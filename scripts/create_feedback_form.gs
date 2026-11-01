/**
 * UNIPROOF AI - Google Forms + Sheets + Drive + Docs starter.
 * Run createUniproofLaunchPack() once from https://script.google.com
 * It creates a feedback form, private response spreadsheet, demo chart,
 * project Drive folders and a public-view glossary document.
 */
function createUniproofLaunchPack() {
  const form = FormApp.create('UNIPROOF AI — обратная связь о MVP', false);
  form.setDescription(
    'Короткий опрос о прототипе UNIPROOF AI. Ответы используются только для учебного анализа. ' +
    'Не указывайте ИИН, паспортные данные, пароли, финансовые сведения или документы третьих лиц.'
  );
  form.setConfirmationMessage('Спасибо! Ваш отзыв поможет улучшить UNIPROOF AI.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);

  form.addScaleItem()
    .setTitle('Насколько понятна идея и назначение UNIPROOF AI?')
    .setBounds(1, 5)
    .setLabels('Совсем непонятна', 'Полностью понятна')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Насколько удобно находить нужные разделы сайта?')
    .setChoiceValues(['Удобно', 'Частично удобно', 'Неудобно'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Какой модуль кажется наиболее полезным?')
    .setChoiceValues(['Document Verify', 'Skill Verify', 'Оба модуля', 'Пока не определился(ась)'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Для кого платформа может быть полезна?')
    .setChoiceValues(['Студенты и выпускники', 'Университеты и преподаватели', 'Работодатели', 'Учебные центры'])
    .setRequired(true);

  form.addScaleItem()
    .setTitle('Оцените общее впечатление от прототипа')
    .setBounds(1, 5)
    .setLabels('Низкое', 'Отличное')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Порекомендовали бы вы UNIPROOF AI другому студенту?')
    .setChoiceValues(['Да', 'Возможно', 'Нет'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Что стоит улучшить в первую очередь?')
    .setRequired(false);

  const spreadsheet = SpreadsheetApp.create('UNIPROOF AI — ответы и демонстрационная аналитика');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  if (form.supportsAdvancedResponderPermissions()) form.setPublished(true);

  const analytics = spreadsheet.insertSheet('Демо-аналитика');
  analytics.getRange('A1:B1').setValues([['Показатель прототипа', 'Демо-оценка (из 5)']]);
  analytics.getRange('A2:B5').setValues([
    ['Понятность идеи', 4.6],
    ['Удобство навигации', 4.2],
    ['Полезность модулей', 4.5],
    ['Общее впечатление', 4.4]
  ]);
  analytics.getRange('A7:B7').merge();
  analytics.getRange('A7').setValue('ВНИМАНИЕ: значения выше условные, демонстрационные. Это не реальные ответы пользователей.');
  analytics.getRange('A1:B1').setFontWeight('bold').setBackground('#dbeafe');
  analytics.getRange('A7').setFontColor('#b45309').setWrap(true);
  analytics.setColumnWidth(1, 260);
  analytics.setColumnWidth(2, 180);
  analytics.insertChart(
    analytics.newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(analytics.getRange('A1:B5'))
      .setPosition(1, 4, 0, 0)
      .setOption('title', 'UNIPROOF AI: демонстрационная оценка MVP')
      .setOption('legend', { position: 'none' })
      .setOption('hAxis', { minValue: 0, maxValue: 5 })
      .build()
  );

  const root = DriveApp.createFolder('06_Site_UNIPROOF_AI');
  ['Text', 'Images', 'Charts', 'Screenshots'].forEach(name => root.createFolder(name));

  const doc = DocumentApp.create('UNIPROOF AI — материалы для Google Sites');
  const body = doc.getBody();
  body.appendParagraph('UNIPROOF AI').setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph('Цифровой паспорт учебных достижений').setHeading(DocumentApp.ParagraphHeading.SUBTITLE);
  body.appendParagraph('Описание проекта').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(
    'UNIPROOF AI — учебный EdTech-проект, который помогает студентам и выпускникам понятнее ' +
    'представлять результаты обучения. Платформа объединяет два направления: Document Verify и Skill Verify. ' +
    'Первый модуль выполняет предварительную техническую проверку файла образовательного документа: ' +
    'формата, читаемости и базовых признаков целостности. Второй помогает оформить учебный проект в портфолио, ' +
    'выделить навыки и связать их с конкретными доказательствами из работы. Предполагаемые навыки должны ' +
    'проверяться преподавателем, а официальный статус документа может появляться только после ответа ' +
    'уполномоченного источника. Основная аудитория проекта — студенты, выпускники, преподаватели, университеты ' +
    'и работодатели. MVP демонстрирует пользовательский сценарий, конструктор портфолио и прозрачное ' +
    'разделение автоматических подсказок и человеческого подтверждения.'
  );
  body.appendParagraph('Проблема и аудитория').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(
    'Учебные достижения часто представлены разрозненными файлами и общими формулировками в резюме. ' +
    'Студенту сложно показать, какие навыки подтверждаются конкретной работой, а работодателю — быстро ' +
    'оценить контекст этих навыков. UNIPROOF AI структурирует доказательства, не подменяя официальную ' +
    'проверку документов и экспертную оценку преподавателя.'
  );
  body.appendParagraph('Функции MVP').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  [
    'Document Verify: предварительная техническая проверка PDF и изображений.',
    'Skill Verify: создание карточки учебного проекта и выбор демонстрируемых навыков.',
    'Evidence: привязка навыка к фрагменту или результату работы.',
    'Teacher Review: демонстрация этапа проверки преподавателем.',
    'Skill Proof Card и профиль: представление учебных достижений и экспорт портфолио.'
  ].forEach(x => body.appendListItem(x));
  body.appendParagraph('Термины').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  [
    'Document Verify — предварительная техническая проверка файла, не равная подтверждению подлинности.',
    'Skill Verify — структурирование навыков, которые могут подтверждаться учебной работой.',
    'Evidence — конкретный фрагмент или результат, служащий доказательством навыка.',
    'Human Confirmation — проверка и подтверждение результата уполномоченным преподавателем.',
    'Skill Proof Card — карточка навыка, доказательства, статуса проверки и даты.'
  ].forEach(x => body.appendListItem(x));
  body.appendParagraph('Ограничения демо').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(
    'Текущий сайт является учебным MVP. Он не подключён к государственным реестрам, не выдаёт официальный ' +
    'вердикт о подлинности документа и не выполняет реальную AI-оценку с проверкой преподавателя. ' +
    'Не загружайте реальные удостоверения личности, конфиденциальные документы или сведения третьих лиц.'
  );
  doc.saveAndClose();
  DriveApp.getFileById(doc.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  Logger.log('FORM_PUBLIC_URL=' + form.getPublishedUrl());
  Logger.log('FORM_EDIT_URL=' + form.getEditUrl());
  Logger.log('SHEET_URL=' + spreadsheet.getUrl());
  Logger.log('DOC_PUBLIC_URL=' + doc.getUrl());
  Logger.log('DRIVE_FOLDER_URL=' + root.getUrl());
}
