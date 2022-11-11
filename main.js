const {createApp } = Vue;

const dt = luxon.DateTime

createApp({
        el: '#app',
        data(){
            return {
                user:{
                    name: 'Ugo de Ughi',
                    avatar: '_io'
                },
                contacts: [
                    {
                        name: 'Michele',
                        avatar: '_1',
                        visible: true,
                        messages: [
                            {
                                date: '10/01/2020 15:30:55',
                                message: 'Hai portato a spasso il cane?',
                                status: 'sent'
                            },
                            {
                                date: '10/01/2020 15:50:00',
                                message: 'Ricordati di dargli da mangiare',
                                status: 'sent'
                            },
                            {
                                date: '10/01/2020 16:15:22',
                                message: 'Tutto fatto!',
                                status: 'received'
                            }
                        ],
                    },
                    {
                        name: 'Fabio',
                        avatar: '_2',
                        visible: true,
                        messages: [{
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                            {
                                date: '20/03/2020 16:30:55',
                                message: 'Bene grazie! Stasera ci vediamo?',
                                status: 'received'
                            },
                            {
                                date: '20/03/2020 16:35:00',
                                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                                status: 'received'
                            }
                        ],
                    },
                    {
                        name: 'Samuele',
                        avatar: '_3',
                        visible: true,
                        messages: [{
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                            },
                            {
                                date: '28/03/2020 10:20:10',
                                message: 'Sicuro di non aver sbagliato chat?',
                                status: 'sent'
                            },
                            {
                                date: '28/03/2020 16:15:22',
                                message: 'Ah scusa!',
                                status: 'received'
                            }
                        ],
                    },
                    {
                        name: 'Luisa',
                        avatar: '_4',
                        visible: true,
                        messages: [{
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                            }, 
                            {
                                date: '10/01/2020 15:50:00',
                                message: 'Si, ma preferirei andare al cinema',
                                status: 'received'
                            }
                        ],
                    },
                ],
                activeContact:{},
                msgString:'',
                strToSearch:'',
                activeMessage: {}
            }
        },
        methods:{
            getLastMessage(contact){
                // restituisco l'ultimo messaggio solo se c'è
                if(contact.messages.length > 0){
                    return contact.messages.at(-1).message;
                }
            },
            getLastDate(contact){
                // restituisco l'ultima data solo se c'è
                if(contact.messages.length > 0){
                    return contact.messages.at(-1).date;
                }
            },
            sendMsg(){
                //1. generare il messaggio
                //2. lo pusho nell'array dei messaggi del contatto attivo
                this.activeContact.messages.push(this.generateMesg(this.msgString,'sent'));
                this.msgString = '';
                //3. faccio partire la risposta
                const answers = [
                    'Ciao!',
                    'Ok',
                    'NOOOOO',
                    'Davvero?!?',
                    'forse...'
                ];
                setTimeout(()=>{
                    this.activeContact.messages.push(this.generateMesg(answers[Math.floor(Math.random() * answers.length)],'recived'));
                },1000)
            },
            generateMesg(msg, status){
                // genere il messaggio sia che sia sente che recived
                return{
                    date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                    message: msg,
                    status: status
                }
            },
            search(){
                // ciclo tutti i contatti
                this.contacts.forEach(contact => {
                    // la proprietà visible del contatto divata true o folse in base all'include
                    contact.visible = contact.name.toUpperCase().includes(this.strToSearch.toUpperCase());
                })
            },
            removeMsg(){
                // devo eliminare il messaggio attivo dall'array dei messaggi del contatto attivo
                // riscreo l'array dei messaggi del contatto attivo filtrando tutti i suoi messaggi solo se il messaggio del ciclo è diverso dal messaggio attivo
                // in questo modo vengono pushati tutti meno quello uguale, di fatto eliminandolo
                this.activeContact.messages = this.activeContact.messages.filter( msg => msg != this.activeMessage);
            }
        },
        created(){
            // inizializzo il primo contatto attivo
            this.activeContact = this.contacts[0];
        }

    },
).mount('#app');