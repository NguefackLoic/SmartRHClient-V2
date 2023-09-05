export interface APIResponse {
    status: number;
    message?: string;
    data?: any;
}

export interface AuthUser {
    username: string;
    pwd: string;
}

export interface AuthResponseType {
    user: User;
    token: string;
}

export interface User {
    id: number;
    email: string;
    uRole: number;
    username: string;
    name: string;
    pwd: string;
    cpwd?: string;
    sts: boolean;
    selected?: boolean;
}

export interface UserExport {
    username: string;
    name: string;
    email: string;
    uRole: string;
    pwd: string;
    sts: string;
}

export interface Indemnite {
    id?: number;
    numcpt: number;
    designation: string;
    isCautisable: boolean;
    isTransport: boolean;
    isTaxable: boolean;
}

export interface IndemniteEmp {

}

export interface Prime {
    id?: number;
    numcpt: number;
    designation: string;
    isCautisable: boolean;
    isTaxable: boolean;
}

export interface Retenu {
    id?: number;
    numcpt: number;
    designation: string;
    type: string;
    prime: number;
    montant: number;
    taux: number
}

export interface AvanNature {
    id?: number;
    numcpt: number;
    designation: string;
    heurSupp?: string;
    isCautisable: boolean;
    isTaxable: boolean;
}

export interface Irpp {
    id?: number;
    startVal: number;
    endVal: number;
    taux: number;
}

export interface Rav {
    id?: number;
    startVal: number;
    endVal: number;
    rav: number;
}

export interface Tdl {
    id?: number;
    startVal: number;
    endVal: number;
    tdl: number;
}

export interface OtherImpot {
    id?: number;
    cfc: number;
    cfcE: number;
    cac: number;
    pvid: number;
    af: number;
    pvE: number;
    fne: number;
    atrav: number;
    isCreated: boolean;
}

export interface Company {
    id?: number;
    rSocial: string;
    adress: string;
    tel: string;
    email: string;
    numContri: string;
    rc: string;
    numCnps: string;
    cle: string;
}

export interface Branche {
    id?: number;
    name: string;
    manager: number;
}

export interface Echelon {
    id?: number;
    name: string;
    selected?: boolean;
}

export interface Category {
    id?: number;
    name: string;
    salaire: number;
    selected?: boolean;
}

export interface SalaireBase {
    id?: number;
    echId: number;
    echName?: string;
    catId: number;
    salaire: number;
}

export interface SearchEmp {
    matricule: string;
    branch: number;
    depart: number;
    poste: number;
    isActif: boolean;
}

export interface AdvantageSurSalaire {
    id?: number;
    empId?: number;
    idAdv: number;
    typeAdv: string;
    amntFix?: number;
    amntPerc?: number;
    dim?: string;
}

export interface RetenuSurSalaire {
    id?: number;
    empId?: number;
    idRet: number;
    typeRet: string;
    amntFix?: number;
    amntPerc?: number;
    dim?: string;
}

export interface Employe {
    id?: number;
    matricule: string;
    matriculeCnps?: string;
    matriculeUCB?: string;
    numCpt?: string;
    bankName: string;
    typeContrat: string;
    modePaie: string;
    firstname: string;
    lastname: string;
    dateBirth: Date;
    sex: string;
    hireDate: Date;
    phone: string;
    email?: string;
    maritalSts: string;
    salary: number;
    jTitleId: number;
    departId: number;
    branchId: number;
    categoryId: number;
    echelonId: number;
    grpIndem?: number;
    grpPrim?: number;
    grpAvant?: number;
    grpRetenu?: number;
    advant: Array<AdvantageSurSalaire>;
    reten: Array<RetenuSurSalaire>;
    isDeclare?: boolean;
    isActif?: boolean;
    dim?: string;
    // oImpot: Array<number>;
}

export interface EmployeATraiter {
    id?: number;
    empId: number;
    paieFrom: Date;
    paieTo: Date;
    nbrJr: number;
    userId: number;
    nbrPnuit: number;
    dim?: string;
    // oImpot: Array<number>;
}

export interface EmployeResponseType {
    employe: Employe;
    depart: Departement;
    poste: JobTitle;
    echelon: Echelon;
    category: Category;
    advant: Array<AdvantageSurSalaire>;
    branch: Array<Branche>;
    selected?: boolean;
}

export interface Departement {
    id?: number;
    name: string;
    manager?: number;
}
export interface DepartResponseType {
    id?: number;
    name: string;
    manager?: Employe;
    selected?: boolean;
}

export interface BrancheResponseType {
    id?: number;
    name: string;
    manager?: Employe;
    selected?: boolean;
}

export interface JobTitle {
    id?: number;
    name: string;
    minSalry?: number;
    maxSalry?: number;
    selected?: boolean;
}

export interface Carriere {
    id?: number;
    jobTitleId: string;
    employeId: number;
    categoryId: number;
    echelonId: number;
    departId: number;
    startDate: Date;
    endDate: Date;
}

export interface Leave {
    id?: number;
    employeId: number;
    leaveType: string;
    reason: string;
    startDate: Date;
    endDate: Date;
    sts: string;
}

export interface Paie {
    id?: number;
    employeId: number;
    nbreJour: number;
    salary: number;
    brutSal: number;
}

export interface Listing {
    id?: number;
    employeId: number;
    nbreJour: number;
    dateFrm?: Date;
    dateTo?: Date;
    salary: number;
    salaryM: number;
    salaryB: number;
    salaryBT: number;
    salaryC: number;
    transport: number;
    declarMonth: number;
    declarYear: number;
    irpp: number;
    cac: number;
    rav: number;
    tdl: number;
    cfc: number;
    pvid: number;
    mntAbs: number;
    hsup: number;
    pnuit: number;
    nbrPnuit: number;
    provMen?: number;
}

export interface ListingPrime {
    id?: number;
    listingId?: number;
    primeId: number;
    amount: number;
    taux?: number;
    type: string;
}

export interface ListingRequest {
    listing: Listing;
    lisPrim: Array<ListingPrime>;
}

export interface IndemRespType {
    lisprim: ListingPrime;
    indem: Indemnite | Prime | AvanNature | Retenu;
}

export interface RetenuRespType {
    lisret: ListingRetenu;
    ret: Retenu;
}

export interface ListingRetenu {
    id: number;
    listingId: number;
    retenuId: number;
    montant: number;
    montantret: number;
    type: string;
}

export interface ListingResponse {
    listx: Listing;
    employe: Employe;
    comp: Company;
    cat: Category;
    func: JobTitle;
    eche: Echelon;
    impos: OtherImpot;
    avans: Array<IndemRespType>;
    rets: Array<RetenuRespType>;
}

export interface BulletinTotalRespType {
    salBase: number;
    salTax: number;
    salBrut: number;
    salCotis: number;
    irpp: number;
    cac: number;
    rav: number;
    tdl: number;
    cfc: number;
    pvid: number;
    cnpsEmp: number;
    totDeduc: number;
    netPay: number;
    salM?: number;
}

export interface BulletinDynamicTotal {
    value: number;
    key: string;
    type: string;
}

export interface PaieParam {
    paieFrom: Date;
    paieTo: Date;
    nbrJr: number;
    nbrPnuit: number;
}

export interface Recap {
    assiette: number;
    assietteT: number;
    rav: number;
    tdl: number;
    irpp: number;
    impot: OtherImpot;
    company: Company;
    dateFrm: Date;
    dateTo: Date;
}
export interface RecapResponse {
    recap: Recap;
    cnps: Cnps;
    impot: Impot;
}

export interface Cnps {
    montPatAf: number;
    afTot: number;
    montPatAt: number;
    atTot: number;
    montSalPv: number;
    montPatPv: number;
    pvTot: number;
    totSalG: number;
    totPatG: number;
    totGlobal: number;
}

export interface Impot {
    iirppTot: number;
    imontSalCac: number;
    icacTot: number;
    imontSalCfc: number;
    imontPatCfc: number;
    icfcTot: number;
    itdlTot: number;
    iravTot: number;
    imontPatFne: number;
    ifneTot: number;
    itotSalG: number;
    itotPatG: number;
    itotGlobal: number;
}

export interface Declares {
    id: number;
    name: string;
    salCaut: number;
    matricule: string;
    matriculeCnps: string;
    nbreJour: number;
    transport: number;
    isDeclare: boolean;
}

export interface IndemniteGroupItem {
    id?: number;
    grpId?: number;
    indmId: number;
    indem?: Indemnite;
    amntFix: number;
    amntPerc: number;
}

export interface IndemniteGroup {
    id?: number;
    name: string;
    items: Array<IndemniteGroupItem>;
}

export interface PrimeGroupItem {
    id?: number;
    grpId?: number;
    indmId: number;
    indem?: Prime;
    amntFix: number;
    amntPerc: number;
}

export interface PrimeGroup {
    id?: number;
    name: string;
    items: Array<PrimeGroupItem>;
}

export interface AvantgGroupItem {
    id?: number;
    grpId?: number;
    indmId: number;
    indem?: Prime;
    amntFix: number;
    amntPerc: number;
}

export interface AvantgGroup {
    id?: number;
    name: string;
    items: Array<AvantgGroupItem>;
}

export interface RetenuGroupItem {
    id?: number;
    grpId?: number;
    indmId: number;
    indem?: Retenu;
    amntFix: number;
    amntPerc: number;
}

export interface RetenuGroup {
    id?: number;
    name: string;
    items: Array<RetenuGroupItem>;
}

export interface ProvisionCongeReqType {
    startDate: Date;
    endDate: Date;
    ProvReq: Array<{ yr: number, mn: number}>;
}

export interface ProvisionCongeResponse {
    listing: Array<Listing>;
    employe: Employe;
    transport: AdvantageSurSalaire;
    provTot: number;
}

export interface ProvisionConge {
    matricule: string;
    matriculeCnps: string;
    matriculeUCB: string;
    firstname: string;
    lastname: string;
    hireDate: Date;
    provMen: number;
    provTot: number;
    mois: string;
    moisn: number
    year: number;
}

export interface Mois13Response {
    listing: Array<Listing>;
    employe: Employe;
    provTot: number;
}

export interface DatProv {
    month: string;
    year: number;
}

export interface RetenuAGCResponse {
    listing: Array<ListingRetenuResponse>;
    employe: Employe;
    retTot?: number;
}

export interface ListingRetenuResponse {
    employeId: number;
    declarMonth: number;
    declarYear: number;
    retMen: number;
}
