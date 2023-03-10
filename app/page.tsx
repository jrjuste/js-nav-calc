import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <>
     <div id="header" className="nys-global-header horizontal stacked">
		<div className="nav-toggle">
			<a href="#" role="button" id="nys-menu-control">Navigation menu</a>
		</div>
    {/* <!-- End nav-toggle div --> */}

		<h1><a href="/DCSE/HomePage"><span>Child</span> <span>Support</span></a></h1>

		<ul id="nys-global-nav">
			<li><a href="#" title="Information for Custodial Parents">Custodial Parents</a>

				<ul>
					<li><a href="/dcse/custodial_parent_services.html">Custodial Parent Services</a></li>
					<li><a href="/dcse/custodial_parent_info.html">Custodial Parent Information</a></li>
					<li><a href="/dcse/how_to_apply.html">How To Apply</a></li>
					<li><a href="/dcse/dd_exp.html">Direct Deposit</a></li>
					<li><a href="/dcse/debitcard.html">Debit Card</a></li>
					<li><a href="/dcse/desk_review.html">Desk Review</a></li>
					<li><a href="/DCSE/secure/ViewPayments" id="viewPaymentsDisbursements" data-role-required="cp">View
							Payments &amp; Disbursements</a></li>
					<li><a href="/DCSE/secure/MonthlyNotice_input" id="monthlyNotice" data-role-required="cp">Monthly
							Notice of Payments &amp; Disbursements</a></li>
				</ul>
			</li>
			<li><a href="#" title="Information for Noncustodial Parents">Noncustodial Parents</a>

				<ul>
					<li><a href="/dcse/non_custodial_parent_services.html">Noncustodial Parent Services</a></li>
					<li><a href="/dcse/enf_actions.html">Enforcement Actions</a></li>
					<li><a href="/dcse/enfUtil.html">Enforcement Actions Assistant</a></li>
					<li><a href="/DCSE/secure/ViewPayments" id="viewPayments" data-role-required="ncp">View Payments</a>
					</li>
					<li><a href="/DCSE/secure/CreatePaymentCoupon" id="paymentCoupon" data-role-required="ncp">Create
							Payment Coupon</a></li>
				</ul>
			</li>
			<li><a href="#" title="Information for Employers" className="capitalize">Employers</a>
				<ul>
					<li><a href="/dcse/employers_new.html" className="capitalize">Employers</a></li>
					<li><a href="https://nynewhire.com/index.jsp" title="Go to New Hire site; new window" id="employersNewHire" target="_blank">Report New Hires</a></li>
					<li><a href="/dcse/whbr_new.html">Provide Information
							(<abbr title="Wage and Health Benefits Report">WHBR</abbr>)</a></li>
					<li><a href="/dcse/iwo_calc.html">Calculator</a></li>
					<li><a href="/dcse/iex_notice.html">Income Withholding for Support</a></li>
					<li><a href="/dcse/iex_worksheet.html">Withholding Limitations</a></li>
					<li><a href="/dcse/iex_cases.html">Cases with Prorated Amounts</a></li>
					<li><a href="/dcse/medx_new.html">Dependent Health Insurance</a></li>
					<li><a href="/dcse/remit.html">Remit Payments</a></li>
					<li><a href="/dcse/terminations.html">Report Terminations</a></li>
					<li><a href="/dcse/employers_FAQ.html"><span className="capitalize">Employers</span> <abbr title="Frequently Asked Questions">FAQ</abbr></a></li>
				</ul>
			</li>

			<li><a href="#" title="Information for Providers">Providers</a>
				<ul>
					<li><a href="/dcse/providers.html">Providers</a></li>
					<li><a href="/dcse/aop_howto.html"><abbr title="Acknowledgment of Parentage">AOP</abbr>
							Instructions</a></li>
					<li><a href="/dcse/aop_faq.html"><abbr title="Frequently Asked Questions">FAQ</abbr>
							for Acknowledgment of Parentage</a></li>
					<li><a href="/dcse/aop_forms.html">Download Forms</a></li>
					<li><a href="/dcse/access_visitation.html">Supervised Visitation</a></li>
				</ul>
			</li>
			<li><a href="/DCSE/LocalOffices_input" title="Locations of Local County Child Support Offices">Local Offices</a></li>
			<li><a href="#" title="Resources" id="resources">Resources</a>
				<ul>
					<li><a href="/dcse/resources.html">Resources</a></li>
					<li><a href="/dcse/publications.html">Publications &amp; Forms</a></li>
					<li><a href="/dcse/parentage_establishment.html">Establishment of Parentage</a></li>
					<li><a href="/dcse/support_enforcement.html">Support Enforcement</a></li>
					<li><a href="/dcse/nonIVDcases.html">Non-IV-D Services</a></li>
					<li><a href="/dcse/help.html">Help</a></li>
				</ul>
			</li>
			<li><a href="/dcse/site_map.html">Site Map</a></li>
			
			
			<li id="log-in-out"><a href="/DCSE/secure/redirect?logout=https%3A%2F%2Fchildsupport.ny.gov%2FDCSE%2Fsecure%2FLogin_input" title="Login">Log in</a></li>
			<li>
				{/* <form id="siteSearch" method="get" action="https://search.its.ny.gov/search/">

					<h2 class="hide"><label for="q"><a href="https://search.its.ny.gov/search?entqr=0&amp;ud=1&amp;sort=date%3AD%3AL%3Ad1&amp;output=xml_no_dtd&amp;oe=UTF-8&amp;ie=UTF-8&amp;client=otda_frontend&amp;proxystylesheet=otda_frontend&amp;site=otda_collection">Search
								OTDA</a> <span class="icon-search"> </span></label></h2>


					<input tabindex="0" type="hidden" name="entqr" value="0">
					<input tabindex="0" type="hidden" name="ud" value="1">
					<input tabindex="0" type="hidden" name="sort" value="date:D:L:d1">
					<input tabindex="0" type="hidden" name="output" value="xml_no_dtd">
					<input tabindex="0" type="hidden" name="oe" value="UTF-8">
					<input tabindex="0" type="hidden" name="ie" value="UTF-8">
					<input tabindex="0" type="hidden" name="client" value="otda_frontend">
					<input tabindex="0" type="hidden" name="proxystylesheet" value="otda_frontend">
					<input tabindex="0" type="hidden" name="site" value="otda_collection">
					<input type="search" id="q" name="q" maxlength="200" placeholder="Search OTDA" value="">
					<button type="submit" style="background:#fff;border:none;"><span class="icon-search"><span class="hide">Go</span></span></button>

				</form> */}
			</li>
		</ul>
	</div>

  <div id="content" class="content-page content">

    
  </div>
    
    </>
   
   




  
  )
}
