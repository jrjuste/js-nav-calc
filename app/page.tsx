"use client"
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Script from "next/script";
import React, { useState } from "react";


const inter = Inter({ subsets: ["latin"] });



export default function Home() {
  const [data, setData] = useState(["hello", "hi there", "holla"]);

  const [showAll, setShowAll] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showCurrent, setShowCurrent] = useState(false);

   const toggleAll = () => {
    setShowAll(val => !val);
    setShowCurrent(false);
  };

  const toggleCurrent = () => {
    if (!showCurrent) {
      setShowCurrent(true);
      setShowAll(false);
      return;
    }
  };

  const setCurrent = (index: React.SetStateAction<number>) => {
    setCurrentIdx(index);
    toggleCurrent();
  };


  return (
    <>
      <Script src="nav.js" />
      <Script src="calc.js" />

      <div>
      <div style={{ display: "flex" }}>
        <button onClick={toggleAll}>{showAll ? "Hide All" : "Show All"}</button>
        <button onClick={() => setCurrent(0)}>First</button>
        <button onClick={() => setCurrent(1)}>Second</button>
        <button onClick={() => setCurrent(2)}>Third</button>
      </div>
      <div>
        {showAll && data.map((el, i) => <p key={`content-${i}`}>{el}</p>)}
      </div>

      {showCurrent ? <div>{data[currentIdx]}</div> : null}
    </div>
      

    
      <div id="header" className="nys-global-header horizontal stacked">
        <div className="nav-toggle">
          <a href="#" role="button" id="nys-menu-control">
            Navigation menu
          </a>
        </div>
        {/* <!-- End nav-toggle div --> */}

        <h1>
          <a href="/DCSE/HomePage">
            <span>Child</span> <span>Support</span>
          </a>
        </h1>

        <ul id="nys-global-nav">
          <li>
            <a href="#" title="Information for Custodial Parents">
              Custodial Parents
            </a>

            <ul>
              <li>
                <a href="/dcse/custodial_parent_services.html">
                  Custodial Parent Services
                </a>
              </li>
              <li>
                <a href="/dcse/custodial_parent_info.html">
                  Custodial Parent Information
                </a>
              </li>
              <li>
                <a href="/dcse/how_to_apply.html">How To Apply</a>
              </li>
              <li>
                <a href="/dcse/dd_exp.html">Direct Deposit</a>
              </li>
              <li>
                <a href="/dcse/debitcard.html">Debit Card</a>
              </li>
              <li>
                <a href="/dcse/desk_review.html">Desk Review</a>
              </li>
              <li>
                <a
                  href="/DCSE/secure/ViewPayments"
                  id="viewPaymentsDisbursements"
                  data-role-required="cp"
                >
                  View Payments &amp; Disbursements
                </a>
              </li>
              <li>
                <a
                  href="/DCSE/secure/MonthlyNotice_input"
                  id="monthlyNotice"
                  data-role-required="cp"
                >
                  Monthly Notice of Payments &amp; Disbursements
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" title="Information for Noncustodial Parents">
              Noncustodial Parents
            </a>

            <ul>
              <li>
                <a href="/dcse/non_custodial_parent_services.html">
                  Noncustodial Parent Services
                </a>
              </li>
              <li>
                <a href="/dcse/enf_actions.html">Enforcement Actions</a>
              </li>
              <li>
                <a href="/dcse/enfUtil.html">Enforcement Actions Assistant</a>
              </li>
              <li>
                <a
                  href="/DCSE/secure/ViewPayments"
                  id="viewPayments"
                  data-role-required="ncp"
                >
                  View Payments
                </a>
              </li>
              <li>
                <a
                  href="/DCSE/secure/CreatePaymentCoupon"
                  id="paymentCoupon"
                  data-role-required="ncp"
                >
                  Create Payment Coupon
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              title="Information for Employers"
              className="capitalize"
            >
              Employers
            </a>
            <ul>
              <li>
                <a href="/dcse/employers_new.html" className="capitalize">
                  Employers
                </a>
              </li>
              <li>
                <a
                  href="https://nynewhire.com/index.jsp"
                  title="Go to New Hire site; new window"
                  id="employersNewHire"
                  target="_blank"
                >
                  Report New Hires
                </a>
              </li>
              <li>
                <a href="/dcse/whbr_new.html">
                  Provide Information (
                  <abbr title="Wage and Health Benefits Report">WHBR</abbr>)
                </a>
              </li>
              <li>
                <a href="/dcse/iwo_calc.html">Calculator</a>
              </li>
              <li>
                <a href="/dcse/iex_notice.html">
                  Income Withholding for Support
                </a>
              </li>
              <li>
                <a href="/dcse/iex_worksheet.html">Withholding Limitations</a>
              </li>
              <li>
                <a href="/dcse/iex_cases.html">Cases with Prorated Amounts</a>
              </li>
              <li>
                <a href="/dcse/medx_new.html">Dependent Health Insurance</a>
              </li>
              <li>
                <a href="/dcse/remit.html">Remit Payments</a>
              </li>
              <li>
                <a href="/dcse/terminations.html">Report Terminations</a>
              </li>
              <li>
                <a href="/dcse/employers_FAQ.html">
                  <span className="capitalize">Employers</span>{" "}
                  <abbr title="Frequently Asked Questions">FAQ</abbr>
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#" title="Information for Providers">
              Providers
            </a>
            <ul>
              <li>
                <a href="/dcse/providers.html">Providers</a>
              </li>
              <li>
                <a href="/dcse/aop_howto.html">
                  <abbr title="Acknowledgment of Parentage">AOP</abbr>
                  Instructions
                </a>
              </li>
              <li>
                <a href="/dcse/aop_faq.html">
                  <abbr title="Frequently Asked Questions">FAQ</abbr>
                  for Acknowledgment of Parentage
                </a>
              </li>
              <li>
                <a href="/dcse/aop_forms.html">Download Forms</a>
              </li>
              <li>
                <a href="/dcse/access_visitation.html">Supervised Visitation</a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="/DCSE/LocalOffices_input"
              title="Locations of Local County Child Support Offices"
            >
              Local Offices
            </a>
          </li>
          <li>
            <a href="#" title="Resources" id="resources">
              Resources
            </a>
            <ul>
              <li>
                <a href="/dcse/resources.html">Resources</a>
              </li>
              <li>
                <a href="/dcse/publications.html">Publications &amp; Forms</a>
              </li>
              <li>
                <a href="/dcse/parentage_establishment.html">
                  Establishment of Parentage
                </a>
              </li>
              <li>
                <a href="/dcse/support_enforcement.html">Support Enforcement</a>
              </li>
              <li>
                <a href="/dcse/nonIVDcases.html">Non-IV-D Services</a>
              </li>
              <li>
                <a href="/dcse/help.html">Help</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/dcse/site_map.html">Site Map</a>
          </li>

          <li id="log-in-out">
            <a
              href="/DCSE/secure/redirect?logout=https%3A%2F%2Fchildsupport.ny.gov%2FDCSE%2Fsecure%2FLogin_input"
              title="Login"
            >
              Log in
            </a>
          </li>
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

      <div id="content" className="content-page content">
        {/* <!-- InstanceBeginEditable name="pageHead" --> */}
        <h1>Income Withholding Calculator</h1>
        {/* <!-- InstanceEndEditable --> */}
        <noscript>
          <div id="jsoff" className="warn">
            <h2>Enable JavaScript to access your account</h2>
            <p>
              To access your account information, please enable JavaScript in
              your browser.
              <a href="/dcse/enable_js.html">
                Follow these instructions to enable JavaScript.
              </a>
            </p>

            <p>
              You can receive your payment information by phone at
              <strong>
                <abbr
                  translate="no"
                  dir="ltr"
                  className="nowrap"
                  title="Teletypewriter: 866-875-9975; Video Relay Service: https://fcc.gov/encyclopedia/trs-providers"
                >
                  1-888-208-4485
                </abbr>
              </strong>
              (
              <abbr title="Teletypewriter" translate="no">
                TTY
              </abbr>
              :{" "}
              <strong translate="no" dir="ltr" className="nowrap">
                1-866-875-9975
              </strong>
              ), Monday&ndash;Friday, 8:00 AM&ndash;7:00 PM.
            </p>
          </div>
        </noscript>

        {/* <!-- InstanceBeginEditable name="content" --> */}

		<div className="right">
			<p>
				<a href="#calcR">
					<img src="calcIcon.svg" alt="" />
					<br />
					Start calculation
				</a>
			</p>
			<p>
				<a href="https://youtu.be/wpqW_LUiov0" title="Watch YouTube video; new window" target="_blank">
					<img src="videoIcon.svg" alt="" />
					<br />
					Calculator video
				</a>
			</p>
			<p>
				<a href="/dcse/lumpSumCalc.html" title="Calculate withholding for lump sum payments (bonuses, commissions, etc.)">
					<img src="lumpSum.svg" alt="" />
					<br />
					Lump sum calculator
				</a>
			</p>
		</div>

    
		<p>
			Based on the Withholding Limitations <a href="/dcse/pdfs/withholdWorksheet.pdf" title="New window with blank sample of Withholding Limitations worksheet" target="_blank">
				Worksheet</a> (<abbr title="Portable Document Format">PDF</abbr>), the
			Income Withholding Calculator is an interactive form designed to calculate withholding in accordance with
			federal and New York State law and regulations. The calculator is meant as an additional tool to help
			employers calculate child support withholding. Please ensure that the information used in the calculation is
			complete and accurate. The Income Withholding Calculator will not produce a correct result if the
			information used is not correct. <abbr title="Division of Child Support Services" translate="no">DCSS</abbr>
			is not responsible for errors due to incomplete or inaccurate data entered by the employer.
		</p>

		<p>
			For detailed information about income withholding calculations, visit the <a href="/dcse/iex_worksheet.html" target="_blank" title="New window">Withholding Limitations Worksheet page</a> or click
			the question mark <a href="/dcse/iex_worksheet.html" target="_blank" title="New window; withholding worksheet page"><img src="/dcse/images/question4.gif" alt="Go to worksheet page" /></a> icon.
      <style jsx>
        {`
        img {
          width: 15px;
          vertical-align:middle;
        }
          `
        }
      </style>
		</p>

		<p>
			Please note: <strong>The calculator does not collect or transmit any data.</strong> None of your inputs are
			saved, so there is no security or privacy risk in using the calculator. Whenever the form is
			"reset," all previous input is cleared from the form.
		</p>

		<p>
			To use the Income Withholding Calculator, you will need your copy or copies of the <a href="/dcse/pdfs/iwoForm.pdf" title="New window with blank sample of income withholding order" target="_blank">Income Withholding for Support</a> (<abbr title="Portable Document Format" translate="no">PDF</abbr>)
			for the employee. <strong>Note:</strong> You may also need
			the amount of the health insurance premium for dependent or family health care coverage, if ordered by a
			National Medical Support Notice.
		</p>

    <div>

			<form id="iexcalc" action="#">

      {/* <!-- optional to enter employee's name --> */}

<p className="containerP" id="calcR">
  <label className="contField" htmlFor="employee_name">Employee Name</label>
  <input className="contField" type="text" id="employee_name" name="employee_name" value="Name (optional)" />
</p>



      </form>

      </div>





      </div>



    </>
  );
}
