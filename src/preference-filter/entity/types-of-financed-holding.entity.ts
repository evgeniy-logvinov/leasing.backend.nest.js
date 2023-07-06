import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { CriteriaFinancedHolding } from './criteria-financed-holding.entity';
import { SubCompany } from './sub-company.entity';

@Entity()
export class TypesOfFinancedHolding {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => TypesOfFinancedHolding)
  @JoinColumn()
  newCriteria: CriteriaFinancedHolding;

  @ManyToOne(() => TypesOfFinancedHolding)
  @JoinColumn()
  previouslyUsedCriteria: CriteriaFinancedHolding;

  @ManyToOne(() => TypesOfFinancedHolding)
  @JoinColumn()
  returnableCriteria: CriteriaFinancedHolding;
  //   @Id
  //   @GeneratedValue(strategy = GenerationType.AUTO)
  //   private Long id;

  //   @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  //   private PreferenceFilter preferenceFilter;

  //   @OneToOne(cascade = CascadeType.ALL)
  //   @JoinColumn(name = "name_id", referencedColumnName = "id")
  //   private NameOfFinanceHolding name;

  //   @ElementCollection
  //   @CollectionTable(name = "types_of_financed_holdings_city", joinColumns = @JoinColumn(name = "types_of_financed_holdings_id"))
  //   @Column(name = "city_id")
  //   private Set<Long> cities = new HashSet<>();

  //   @OneToOne(cascade = CascadeType.ALL)
  //   @JoinColumn(name = "new_id", referencedColumnName = "id")
  //   private CriteriaFinancedHolding newCriteria;

  //   @OneToOne(cascade = CascadeType.ALL)
  //   @JoinColumn(name = "previously_used_id", referencedColumnName = "id")
  //   private CriteriaFinancedHolding previouslyUsedCriteria;

  //   @OneToOne(cascade = CascadeType.ALL)
  //   @JoinColumn(name = "returnable_id", referencedColumnName = "id")
  //   private CriteriaFinancedHolding returnableCriteria;

  //   public TypesOfFinancedHolding() {

  //   }

  //   public TypesOfFinancedHolding(PreferenceFilter preferenceFilter, NameOfFinanceHolding name, CriteriaFinancedHolding newCriteria, CriteriaFinancedHolding previouslyUsedCriteria, CriteriaFinancedHolding returnableCriteria) {
  //       this.preferenceFilter = preferenceFilter;
  //       this.name = name;
  //       this.newCriteria = newCriteria;
  //       this.previouslyUsedCriteria = previouslyUsedCriteria;
  //       this.returnableCriteria = returnableCriteria;
  //   }

  //   public Long getId() {
  //       return id;
  //   }

  //   public void setId(Long id) {
  //       this.id = id;
  //   }

  //   public NameOfFinanceHolding getName() {
  //       return name;
  //   }

  //   public void setName(NameOfFinanceHolding name) {
  //       this.name = name;
  //   }

  //   public CriteriaFinancedHolding getNewCriteria() {
  //       return newCriteria;
  //   }

  //   public void setNewCriteria(CriteriaFinancedHolding newCriteria) {
  //       this.newCriteria = newCriteria;
  //   }

  //   public CriteriaFinancedHolding getPreviouslyUsedCriteria() {
  //       return previouslyUsedCriteria;
  //   }

  //   public void setPreviouslyUsedCriteria(CriteriaFinancedHolding previouslyUsedCriteria) {
  //       this.previouslyUsedCriteria = previouslyUsedCriteria;
  //   }

  //   public CriteriaFinancedHolding getReturnableCriteria() {
  //       return returnableCriteria;
  //   }

  //   public void setReturnableCriteria(CriteriaFinancedHolding returnableCriteria) {
  //       this.returnableCriteria = returnableCriteria;
  //   }

  //   @JsonIgnore
  //   public PreferenceFilter getPreferenceFilter() {
  //       return preferenceFilter;
  //   }

  //   public void setPreferenceFilter(PreferenceFilter preferenceFilter) {
  //       this.preferenceFilter = preferenceFilter;
  //   }

  //   public Set<Long> getCities() {
  //       return cities;
  //   }

  //   public void setCities(Set<Long> cities) {
  //       this.cities = cities;
  //   }
}
