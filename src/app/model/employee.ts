export class Employee{
	id: number;
	name: String;
	date_born: String;
	country: number;
	user_name: String;
	date_hire: String;
	status: boolean;
	area: number;
	job_tittle: number;
	tip_rate: number;

	constructor(form,id){
		if(id){
			this.id = parseInt(id);
		}
		if(typeof(form.date_born) == "string"){
			this.date_born = form.date_born
		}else{
			this.date_born = form.date_born?form.date_born.format("YYYY-MM-DD"):'';		
		}
		if(typeof(form.date_hire) == "string"){
			this.date_hire = form.date_hire
		}else{
			this.date_hire = form.date_hire ? form.date_hire.format("YYYY-MM-DD"):'';
		}
		this.name = form.name?form.name:'';		
		this.country = form.country?form.country:'';
		this.user_name = form.user_name?form.user_name:'';		
		this.area = form.area?form.area:'';
		this.status = form.status?form.status:'';
		this.job_tittle = form.job_tittle?form.job_tittle:form.job_tittle;
		this.tip_rate = form.tip_rate?form.tip_rate:'';

	}
}