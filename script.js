const mySkills=['javascript','Html','css','react']

const mySkillsList=document.getElementById('skills-list')
mySkills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    mySkillsList.appendChild(li);
});

 const myProjects=[
    {
        name:'A working Portfolio',
        TechnologiesUsed:'Html, Css, Javascript',
    },
    {
        name:'a website for AWS',
        TechnologiesUsed:'Html, Css, Javascript',
    },
     {
        name:'a mobile app for a local business',
        TechnologiesUsed:'React Native, JavaScript',
     }
];

     const myProjectsList=document.getElementById('projects-list')
     myProjects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = `${project.name} - Technologies Used: ${project.TechnologiesUsed}`;
        myProjectsList.appendChild(li);
     });

const contactDetails = [
    {
        label: 'EMAIL',
        value: 'otieno.rolex@student.moringaschool.com',
        href: 'mailto:otieno.rolex@student.moringaschool.com',
    },
    {
        label: 'PHONE',
        value: '+254 745183180',
        href: 'tel:+254745183180',
    },
    {
        label: 'GITHUB',
        value: 'Visit my GitHub profile',
        href: 'https://github.com/otienorolex-debug',
    },
];

const contactLinks = document.getElementById('contact-links');
contactDetails.forEach((contact, index) => {
    const card = document.createElement('a');
    card.classList.add('contact-card');
    card.href = contact.href;

    const number = document.createElement('span');
    number.classList.add('contact-card-number');
    number.textContent = `0${index + 1}`;

    const label = document.createElement('span');
    label.classList.add('contact-card-label');
    label.textContent = contact.label;

    const value = document.createElement('span');
    value.classList.add('contact-card-value');
    value.textContent = contact.value;

    card.append(number, label, value);
    contactLinks.appendChild(card);
});